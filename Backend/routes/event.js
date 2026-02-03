import express from 'express';
import Event from '../models/Event.js';
import multer from 'multer';
import { storage, cloudinary } from '../utils/cloudinary.js';
import verifyToken, { checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage });


const checkEventOwnership = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.owner.toString() !== req.user.id) {
      return res.status(403).json({
        error: "Access denied. Only the event creator can perform this action."
      });
    }

    req.event = event; // Pass event to next middleware
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to verify event ownership" });
  }
};

//Post

router.post("/create", verifyToken, checkRole(['organizer', 'admin']), upload.single("image"), async (req, res) => {
  try {
    const eventData = req.body;

    if (!eventData.totalCapacity) {
      return res.status(400).json({ error: "Total capacity is required" });
    }

    eventData.owner = req.user.id;
    eventData.availableTickets = eventData.totalCapacity;

    if (req.file) {
      eventData.image = req.file.path;
      eventData.imagePublicId = req.file.filename;
    }

    const newEvent = new Event(eventData);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event", details: error.message });
  }
});



//GET


router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('owner', 'name email');
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});


router.get("/my/events", verifyToken, async (req, res) => {
  try {
    const events = await Event.find({ owner: req.user.id })
      .sort({ createdAt: -1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your events" });
  }
});


//PUT
router.put("/:id", verifyToken, checkEventOwnership, upload.single("image"), async (req, res) => {
  try {
    const event = req.event; // From middleware

    // Additional validation: prevent changing critical fields if tickets are sold
    if (event.ticketsSold > 0) {
      const restrictedFields = ['totalCapacity', 'ticketPrice', 'eventDate'];
      const hasRestrictedChanges = restrictedFields.some(field =>
        req.body[field] && req.body[field] != event[field]
      );

      if (hasRestrictedChanges) {
        return res.status(400).json({
          error: "Cannot modify capacity, price, or date after tickets have been sold"
        });
      }
    }

    if (req.file) {
      if (event.imagePublicId) {
        await cloudinary.uploader.destroy(event.imagePublicId);
      }
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('owner', 'name email');

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE
router.delete("/:id", verifyToken, checkEventOwnership, async (req, res) => {
  try {
    const event = req.event;

    // Delete image from Cloudinary if exists
    if (event.imagePublicId) {
      await cloudinary.uploader.destroy(event.imagePublicId);
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// POST - Register for event
router.post("/:id/register", verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.availableTickets === 0) {
      return res.status(400).json({ error: "Event is sold out" });
    }

    // Check if user already registered
    const alreadyRegistered = event.participants.some(
      p => p.user.toString() === req.user.id
    );

    if (alreadyRegistered) {
      return res.status(400).json({ error: "Already registered for this event" });
    }

    const { name, email, phoneNumber, paymentId } = req.body;

    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ error: "Missing required registration details" });
    }

    // Add participant and update tickets
    event.participants.push({
      user: req.user.id,
      name,
      email,
      phoneNumber,
      paymentId: paymentId || `FAKE-${Date.now()}`,
      paymentStatus: 'completed'
    });
    event.availableTickets -= 1;
    event.ticketsSold += 1;

    await event.save();

    res.json({
      message: "Successfully registered for event",
      event
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register for event" });
  }
});

export default router;