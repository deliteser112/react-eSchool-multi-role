const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const secretarSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  etc: [String],
});

module.exports = mongoose.model("Secretar", secretarSchema);
