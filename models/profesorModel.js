const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const secretarSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  clasa: { type: Number, required: true },
  materia: { type: String },
});

module.exports = mongoose.model("Profesor", secretarSchema);
