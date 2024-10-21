import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    return next(
      res.status(401).json({
        message: "Anda tidak boleh mengakses halaman ini",
      })
    );
  }

  let decoded;

  try {
    decoded = await jwt.verify(token, process.env.JWT_TOKEN);
  } catch (error) {
    return next(
      res.status(401).json({
        message: "Token yand dimasukan salah/tidak ada",
      })
    );
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      res.status(401).json({
        message: "User tidak ditemukan/terhapus",
      })
    );
  }

  req.user = currentUser;

  next();
};

export const permisionUser = (...roles) => {
  return (req, res, next) => {
    //['admin', 'petugas', 'kasir']

    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          message: "role anda tidak bisa mengakses halaman ini",
        })
      );
    }

    next();
  };
};
