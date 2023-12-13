import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          value: {
            type: String,
            required: true,
          },
        },
      ],
      correctAnswer: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Quiz = mongoose.model("Quiz", quizSchema);
