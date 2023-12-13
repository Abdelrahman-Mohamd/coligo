import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import announcementRoute from "./routes/announcementRoute.js";
import quizRoute from "./routes/quizRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
app.use(cors());

app.use("/announcements", announcementRoute);
app.use("/quizzes", quizRoute);

//connect with MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
