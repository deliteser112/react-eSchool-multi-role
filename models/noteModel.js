const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  materia: { type: String, required: true },
  profesor: { type: String, required: true },
  note: { type: Array, min: 1, max:10 },
});

module.exports = mongoose.model("Note", noteSchema);
