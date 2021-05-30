const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materieSchema = new Schema({
  denumire: { type: String, required: true },
  profesori: { type: Array, required: true },
  clase: { type: Array },
});

module.exports = mongoose.model("Materie", materieSchema);
