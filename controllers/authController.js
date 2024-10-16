import User from "../models/User.js";

export const RegisterUser = async (req, res) => {
  try {
    const createUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      message: "Registrasi berhasil",
      data: createUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error",
      error,
    });
  }
};

export const LoginUser = (req, res) => {
  res.send("Login berhasil");
};

export const LogoutUser = (req, res) => {
  res.send("Logout berhasil");
};

export const GetUser = (req, res) => {
  res.send("GetUser berhasil");
};
