const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const multer = require("multer");
const { storage, cloudinary } = require("../utils/cloudinary");
const verifyToken = require("../middlewares/authMiddleware");

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

router.post("/create", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const eventData = req.body;
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

module.exports = router;