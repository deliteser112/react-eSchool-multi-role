const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectGradesSchema = new mongoose.Schema(
  {
    userSubject: { type: Schema.Types.ObjectId, ref: "UserSubjects", required: true },
    grade: { type: Number, required: false, default: 0 },
    partial: { type: Number, required: false, default: 1 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubjectGrades", subjectGradesSchema);