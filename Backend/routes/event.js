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

module.exports = router;