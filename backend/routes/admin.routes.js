const multer = require("multer");
const router = require("express").Router();
const {
  getAllCarts,
  deleteAllCarts,
  getCartUserProducts,
} = require("../controllers/cart.controllers");
const {
  getAllOrders,
  deleteAllOrders,

  deleteAllUserOrder,
  getUserOrders,
  deleteUserOrder,
} = require("../controllers/orders.controllers");
const {
  getAllProducts,
  getPrductById,
  addnewproduct,
  updateProduct,
  deleteAllProducts,
  deleteProductById,
} = require("../controllers/products.controllers");
const {
  getAllUsers,
  getUser,
  deleteAllUsers,
  deleteUser,
  register,
  login,
  getCount,
} = require("../controllers/users.controllers");

const { authMiddleware } = require("../middlewares/authMiddlewares");
const { isAdmin } = require("../middlewares/isAdmin");
const { upload } = require("../middlewares/multer");
const { ValidateObjectId } = require("../middlewares/ValidateObjectId");

/*===== register and login =====*/
router.post("/register", upload.single("image"), register);
router.post("/login", login);
/*===== register and login =====*/

/*===== users =====*/
router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/users/:id", authMiddleware, isAdmin, ValidateObjectId, getUser);
router.delete("/users", authMiddleware, isAdmin, deleteAllUsers);
router.delete(
  "/users/:id",
  authMiddleware,
  isAdmin,
  ValidateObjectId,
  deleteUser
);
/*=====// users //=====*/

/*===== products =====*/
router.post(
  "/products",
  authMiddleware,
  isAdmin,
  upload.single("image"),
  addnewproduct
);

router.get("/products", authMiddleware, isAdmin, getAllProducts);
router.get(
  "/products/:id",
  authMiddleware,
  isAdmin,
  ValidateObjectId,
  getPrductById
);

router.put(
  "/products/:id",
  authMiddleware,
  isAdmin,
  upload.single("image"),
  ValidateObjectId,
  updateProduct
);

router.delete("/products", authMiddleware, isAdmin, deleteAllProducts);
router.delete(
  "/products/:id",
  authMiddleware,
  isAdmin,
  ValidateObjectId,
  deleteProductById
);
/*=====// products //=====*/

/*===== cart =====*/
router.get("/carts", authMiddleware, isAdmin, getAllCarts);
router.get(
  "/carts/:id",
  authMiddleware,
  isAdmin,
  ValidateObjectId,
  getCartUserProducts
);
router.delete("/carts", authMiddleware, isAdmin, deleteAllCarts);
/*=====// cart //=====*/

/*===== order =====*/
router.get("/orders", authMiddleware, isAdmin, getAllOrders);
router.get(
  "/orders/:id",
  authMiddleware,
  isAdmin,
  ValidateObjectId,
  getUserOrders
);

// delte all orders
router.delete("/orders", authMiddleware, isAdmin, deleteAllOrders);
// delte owner oreder
router.delete("/orders/owner/all", authMiddleware, deleteAllUserOrder);
// delte owner oreder
router.delete("/orders/users/:id", authMiddleware, deleteUserOrder);

/*=====// order //=====*/

router.get("/admin/count", authMiddleware, isAdmin, getCount);
module.exports = router;
