const {
  addnewproduct,
  getAllProducts,
  deleteAllProducts,
  getPrductById,
  deleteProductById,
  updateProduct,
  getProducts,
  addCount,
} = require("../controllers/products.controllers");
const { ValidateObjectId } = require("../middlewares/ValidateObjectId");

const { authMiddleware } = require("../middlewares/authMiddlewares");
const { isAdmin } = require("../middlewares/isAdmin");
const { upload } = require("../middlewares/multer");

const router = require("express").Router();

// add new product
router.post("/", authMiddleware, upload.single("image"), addnewproduct);
// get  all products
router.get("/", getAllProducts);
router.get("/all", getProducts);

// get product by id
router.get("/:id", ValidateObjectId, getPrductById);

router.put("/count/:id", ValidateObjectId, addCount);
// update product by id
router.put(
  "/update/:id",
  authMiddleware,
  upload.single("image"),
  ValidateObjectId,
  updateProduct
);
// delete product by id
router.delete("/:id", ValidateObjectId, deleteProductById);
// delete all products
router.delete("/deleteAll", deleteAllProducts);

module.exports = router;
