const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSubjectsSchema = new mongoose.Schema(
  {
    subject: { type: Schema.Types.ObjectId, ref: "Subjects", required: true },
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    year: { type: Number, required: true }
    // subjectGrades: [
    //   {
    //     subjectGrade: {type: Schema.Types.ObjectId, ref: 'SubjectGrades'}
    //   }
    // ]
  },
  { timestamps: true }
  , {
    toJSON: {
      virtuals: true,
    }
  }
);

module.exports = mongoose.model("UserSubjects", userSubjectsSchema);