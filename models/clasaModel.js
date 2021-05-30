const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clasaSchema = new Schema({
  clasa: { type: Number, required: true },
  subclasa: { type: String, enum: ["A", "B", "C"] },
  profesori: { type: Array, required: true },
  clase: { type: Array },
});

module.exports = mongoose.model("Clasa", clasaSchema);
