const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const elevInstantaSchema = new Schema({
  elev: { type: Schema.Types.ObjectId, ref: "Elev", required: true },
  clasa_curenta: { type: Number, required: true },
  note_curente: { type: String, enum:['0','1','2','3','4','5','6','7','8','9','10'], default: '0'  },
});

module.exports = mongoose.model("ElevInstanta", elevInstantaSchema);
