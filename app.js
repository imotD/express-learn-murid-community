import express from "express";
import mongoose from "mongoose";
import dotnev from "dotenv";
import cors from "cors";
import authRouter from "./router/authRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotnev.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Router
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

// Endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "message berhasil" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

mongoose.connect(process.env.DATABASE_MONGODB, {}).then(() => {
  console.log("Database Connect");
});
