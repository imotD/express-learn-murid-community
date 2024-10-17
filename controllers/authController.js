import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: "6d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: false,
  };

  res.cookie("jwt", token, cookieOption);

  user.password = undefined;

  res.status(statusCode).json({
    data: user,
  });
};

export const RegisterUser = asyncHandler(async (req, res) => {
  const createUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(createUser, 201, res);
});

export const LoginUser = (req, res) => {
  res.send("Login berhasil");
};

export const LogoutUser = (req, res) => {
  res.send("Logout berhasil");
};

export const GetUser = (req, res) => {
  res.send("GetUser berhasil");
};
