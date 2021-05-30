const Elev = require("../models/elevModel")

const elevControl = {

  getElevInfo: async (req, res) => {
    try {
      const elev = await Elev.findById(req.user.id).select("-password");
      res.json(elev);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = elevControl;