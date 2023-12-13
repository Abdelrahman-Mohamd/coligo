import mongoose from "mongoose";

const announcementSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export const Announcement = mongoose.model("Announcement", announcementSchema);
