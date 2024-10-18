import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username harus diinput"],
    unique: [true, "username sudah digunakan"],
  },
  email: {
    type: String,
    required: [true, "email harus diinput"],
    unique: [true, "email sudah digunakan"],
    validator: {
      validator: validator.isEmail,
      message: "inputan harus berformat email",
    },
  },
  password: {
    type: String,
    required: [true, "password harus diinput"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.methods.comparePassword = async function (reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
};

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
