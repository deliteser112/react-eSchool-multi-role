const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Va rugam sa va introduceti numele!"],
      trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subjects", subjectSchema);