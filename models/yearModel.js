const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: [true, "Va rugam sa va introduceti numele!"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Years", yearSchema);