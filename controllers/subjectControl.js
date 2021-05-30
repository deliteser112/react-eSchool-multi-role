const Subjects = require("../models/subjectModel");

const subjectControl = {
  createSubject: async (req, res) => {
    try {
      const { name } = req.body;;
  
      const check = await Subjects.findOne({ name });
      if (check) return res.status(400).json({ msg: "Subject Existent" });
  
      const newSubjects = new Subjects({
        name,
      });
  
      await newSubjects.save();
      res.json({ msg: "Subject created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSubjects: async (req, res) => {
    try {
      // console.log(req.user);
      const subjects = await Subjects.find();

      res.json(subjects);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = subjectControl