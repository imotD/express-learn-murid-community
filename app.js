import express from "express";
import mongoose from "mongoose";
import dotnev from "dotenv";
import cors from "cors";
import authRouter from "./router/authRouter.js";

dotnev.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());

// Router
app.use("/api/v1/auth", authRouter);

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
