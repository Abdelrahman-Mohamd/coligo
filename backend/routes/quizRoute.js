import express from "express";
import { Quiz } from "../models/quizModel.js";
const router = express.Router();

// Add new announcement
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.course ||
      !req.body.topic ||
      !req.body.dueDate ||
      !req.body.questions ||
      !Array.isArray(req.body.questions) ||
      req.body.questions.length === 0 ||
      req.body.questions.some(
        (question) =>
          !question.question ||
          !Array.isArray(question.options) ||
          question.options.length === 0 ||
          !question.correctAnswer
      )
    ) {
      return res
        .status(400)
        .send({ message: "Please send the required fields" });
    }
    const newQuiz = {
      title: req.body.title,
      course: req.body.course,
      topic: req.body.topic,
      dueDate: req.body.dueDate,
      questions: req.body.questions.map((question) => ({
        question: question.question,
        options: question.options.map((option) => ({
          value: option.value,
        })),
        correctAnswer: question.correctAnswer,
      })),
    };
    const quiz = await Quiz.create(newQuiz);
    return res.status(201).send(quiz);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const quiz = await Quiz.find({});
    return res.status(200).json(quiz);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Get one announcement by Id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    return res.status(200).json(quiz);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Update one announcement
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.course ||
      !req.body.topic ||
      !req.body.dueDate ||
      !req.body.questions ||
      !Array.isArray(req.body.questions) ||
      req.body.questions.length === 0 ||
      req.body.questions.some(
        (question) =>
          !question.question ||
          !Array.isArray(question.options) ||
          question.options.length === 0 ||
          !question.correctAnswer
      )
    ) {
      return res
        .status(400)
        .send({ message: "Please send the required fields" });
    }
    const { id } = req.params;
    const result = await Quiz.findByIdAndUpdate(id, req.body);
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
    const result = await Quiz.findByIdAndDelete(id);
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
