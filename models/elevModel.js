const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const elevSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  nume: {type: String, required: true},
  clasa: { type: Number, required: true },
  note: { type: String, enum:['0','1','2','3','4','5','6','7','8','9','10'] },
});

module.exports = mongoose.model("Elev", elevSchema);
