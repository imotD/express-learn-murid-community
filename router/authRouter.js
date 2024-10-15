import express from "express";

import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  GetUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);
router.get("/getUser", GetUser);

export default router;
