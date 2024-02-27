const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    product: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "product",
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    image: {
      type: Object,
      required: true,
      default: {
        url: "https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_1280.jpg",
      },
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success"], // enum: role adimn or customer else error
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", CartSchema);
