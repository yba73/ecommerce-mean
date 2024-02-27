const mongoose = require("mongoose");

exports.ValidateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "invalid id" });
  next();
};
