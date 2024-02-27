const router = require("express").Router();

const {
  register,
  login,
  getAllUsers,
  getUser,

  deleteUser,

  updateUser,
  insertPhotoUser,
} = require("../controllers/users.controllers");
const { authMiddleware } = require("../middlewares/authMiddlewares");

const { upload } = require("../middlewares/multer");
const { ValidateObjectId } = require("../middlewares/ValidateObjectId");

// register new user
router.post("/register", upload.single("image"), register);
// login
router.post("/login", login);
router.get("/", authMiddleware, getAllUsers);

// get  user by token
// router.get("/userinfo", authMiddleware, getUserConnectInfo);

router.get("/:id", authMiddleware, ValidateObjectId, getUser);

// // update user by id
// router.put("/", authMiddleware, upload.single("image"), updateUser);
// add profile photo
router.put(
  "/photo/:id",
  authMiddleware,
  upload.single("image"),
  ValidateObjectId,
  insertPhotoUser
);

module.exports = router;
