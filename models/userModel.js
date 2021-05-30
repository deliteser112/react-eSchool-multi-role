const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Va rugam sa va introduceti numele!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Va rugam sa va introduceti email-ul!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Va rugam sa va introduceti parola!"],
      trim: true,
    },
    role: {
      type: Number,
      default: 0, // 0 --> user,  2 --> profesor,  3 --> admin
      required: [true, "Va rugam sa introduceti rolul!"],
      trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
