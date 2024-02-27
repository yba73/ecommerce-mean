const {
  addProductInCart,
  getCartUserProducts,
  updateUserCart,
  deleteAllProductsInCart,
  deleteAllCarts,
  deleteProductInCart,
  getAllCarts,
} = require("../controllers/cart.controllers");
const { ValidateObjectId } = require("../middlewares/ValidateObjectId");

const { authMiddleware } = require("../middlewares/authMiddlewares");
const { isAdmin } = require("../middlewares/isAdmin");

const router = require("express").Router();
// add new product by id in cart

// get cart owner
router.post("/:id", authMiddleware, ValidateObjectId, addProductInCart);
router.get("/", authMiddleware, getAllCarts);
router.get("/:id", authMiddleware, ValidateObjectId, getCartUserProducts);

router.put("/:id", authMiddleware, ValidateObjectId, updateUserCart);

router.delete("/:id", authMiddleware, deleteAllProductsInCart);
// router.delete("/:id", authMiddleware, isAdmin, deleteAllCarts);
router.delete(
  "/product/:id",
  authMiddleware,
  ValidateObjectId,
  deleteProductInCart
);

module.exports = router;
