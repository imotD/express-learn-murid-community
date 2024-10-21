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
  const isFirstAccount = (await User.countDocuments()) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const createUser = await User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role,
  });

  createSendToken(createUser, 201, res);
});

export const LoginUser = asyncHandler(async (req, res) => {
  // validasi email dan password yang tidak diisi
  if (!req.body.email && !req.body.password) {
    res.status(400);
    throw new Error("Inputan email dan password tidak boleh kosong");
  }

  // check jika email yang di input sudah terdaftar di DB
  const userData = await User.findOne({
    email: req.body.email,
  });

  if (userData && (await userData.comparePassword(req.body.password))) {
    createSendToken(userData, 200, res);
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

export const LogoutUser = (req, res) => {
  res.cookie("jwt", "", {
    expire: new Date(0),
    httpOnly: true,
    security: false,
  });

  res.status(200).json({
    message: "Logout Berhasil",
  });
};

export const GetUser = async (req, res) => {
  const user = await User.findById(req.user.id).select({ password: 0 });

  if (user) {
    return res.status(200).json({
      user,
    });
  }

  return res.status(401).json({
    message: "user tidak ditemukan",
  });
};
