const subjectGrade = require("../models/subjectGradesModel");

const subjectGradeControl = {
  getSubjectGrade: async (req, res) => {
    try {
        const { ids } = req.body;
    
        let response = []
        response = await subjectGrade.find().sort({updatedAt: -1}).where('userSubject').in(ids).exec();
        
        res.json(response);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
  },
  createsubjectGrade: async (req, res) => {
    try {
        const { subjectStudent, partial, grade } = req.body;
  
      const newSubjectGrade = new subjectGrade({
        userSubject:subjectStudent,
        partial,
        grade
      });
  
      await newSubjectGrade.save();
      res.json({ msg: "Subject grade created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateGradeSubject: async (req, res) => {
    try {
    
      const { grade } = req.body;
      const { id } = req.params;
  
      await subjectGrade.findOneAndUpdate(
        { _id: id },
        {
          grade: grade,
        }
      );
      res.json({ msg: "Grade updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};
module.exports = subjectGradeControl