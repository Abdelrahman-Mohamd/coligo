import express from "express";
import { Announcement } from "../models/announcementModel.js";
const router = express.Router();

// Add new announcement
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.role ||
      !req.body.image ||
      !req.body.content
    ) {
      return res
        .status(400)
        .send({ message: "Please send the required fields" });
    }
    const newAnnouncement = {
      name: req.body.name,
      role: req.body.role,
      image: req.body.image,
      content: req.body.content,
    };
    const announcement = await Announcement.create(newAnnouncement);
    return res.status(201).send(announcement);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find({});
    return res.status(200).json(announcements);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Get one announcement by Id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findById(id);
    return res.status(200).json(announcement);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Update one announcement
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.role ||
      !req.body.image ||
      !req.body.content
    ) {
      return res
        .status(400)
        .send({ message: "Please send the required fields" });
    }
    const { id } = req.params;
    const result = await Announcement.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    return res
      .status(200)
      .send({ message: "Announcement updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Delete an announcement
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Announcement.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    return res
      .status(200)
      .send({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
