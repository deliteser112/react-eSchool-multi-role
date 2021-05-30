const Years = require("../models/yearModel");

const yearControl = {
  createYear: async (req, res) => {
    try {
      const { value } = req.body;;
  
      const check = await Years.findOne({ value });
      if (check) return res.status(400).json({ msg: "Year Existent" });
  
      const newYear = new Years({
        value,
      });
  
      await newYear.save();
      res.json({ msg: "Year created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getYears: async (req, res) => {
    try {
      const years = await Years.find();

      res.json(years);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = yearControl