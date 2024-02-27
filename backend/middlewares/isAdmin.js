exports.isAdmin = async (req, res, next) => {
  try {
    console.log("role", req.role);
    if (req.role !== "admin")
      return res.status(401).json({ message: "you are note admin" });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};
