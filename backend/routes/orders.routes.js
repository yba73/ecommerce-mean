const {
  newOrder,

  updateOrder,
  getUserOrders,
} = require("../controllers/orders.controllers");
const { ValidateObjectId } = require("../middlewares/ValidateObjectId");
const { authMiddleware } = require("../middlewares/authMiddlewares");
const { isAdmin } = require("../middlewares/isAdmin");

const router = require("express").Router();

// add owenr order
router.post("/:id", authMiddleware, ValidateObjectId, newOrder);

router.get("/:id", authMiddleware, ValidateObjectId, getUserOrders);

// update owner order
router.put("/", authMiddleware, isAdmin, updateOrder);

module.exports = router;
