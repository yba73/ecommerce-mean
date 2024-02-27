const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  try {
    // console.log("headers", req.headers);
    // get token from req.headers.authorization
    const token = req.headers.authorization;
    // check if is there token or note
    if (!token)
      return res.status(401).json({ message: "Not authorized, no token" }); // if not send
    // get user id from token sign if is verify token true
    const verifyUserByToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (error, decode) => {
        if (error) return res.status(401).json({ message: "invalid token" });
        // check if is token invalid
        else return decode; // else return decode token
      }
    );
    // store id and role from user and save him in req.userId and req.role to send him to next Middlewar
    req.userId = verifyUserByToken.sub;
    req.role = verifyUserByToken.role;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
