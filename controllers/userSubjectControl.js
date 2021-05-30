const userSubject = require("../models/userSubjectsModel");
const subjectGrade = require("../models/subjectGradesModel");

const subjectControl = {
  findUserSubject: async (req, res) => {
    try {
      const { year, user } = req.params;
  
      let response = []
      if( user ){
        response = await userSubject.find({ year: year, user: user })
        .populate('subjectGrades')
        .populate({
            path: 'user',
            select: ['name','email','role']
          }).populate({
            path: 'subject',
            select: ['name']
          })
      }else{
        response = await userSubject.find({ year: year })
          .populate({
            path: 'user',
            select: ['name','email','role']
        }).populate({
          path: 'subject',
          select: ['name']
      })
    }
      
      res.json(response);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createUserSubject: async (req, res) => {
    try {
        const { user, subject, year } = req.body;
  
      const newUserSubject = new userSubject({
        user,
        subject,
        year
      });
  
      await newUserSubject.save();
      res.json({ msg: "Subject created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUserSubject: async (req, res) => {
    try {
    
      const { id } = req.params;
  
      await userSubject.findByIdAndDelete(id);
      res.json({ msg: "Subject deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUserSubject: async (req, res) => {
    try {
    
      const { id, subject } = req.body;
  
      await userSubject.findOneAndUpdate(
        { _id: id },
        {
          subject: subject,
        }
      );
      res.json({ msg: "Subject updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  // ,
  // updateGradeSubject: async (req, res) => {
  //   try {
    
  //     const { id, grade } = req.body;
  
  //     await userSubject.findOneAndUpdate(
  //       { _id: id },
  //       {
  //         grade: grade,
  //       }
  //     );
  //     res.json({ msg: "Grade updated" });
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // }
  // ,createGrade: async (req, res) => {
  //   try {
  //     const { id, partial, grade } = req.body;
  
  //     const newSubjectGrade = new subjectGrade({
  //       userSubject: id,
  //       partial,
  //       grade
  //     });
  
  //     await newSubjectGrade.save();
  //     if(newSubjectGrade._id){
  //       const usrSubject = await userSubject.findOne({ _id: id })
  //       if(usrSubject){
  //         usrSubject.subjectGrades.push(newSubjectGrade)
  //         await usrSubject.save()
  //       }
  //       res.json({ msg: "Subject created" });
  //     }
  //     res.status(500).json({ msg: 'Grade not created' });
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // }
};
module.exports = subjectControl