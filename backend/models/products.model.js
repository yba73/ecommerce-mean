const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_1280.jpg",
        publicId: null,
      },
      required: true,
    },

    genre: {
      type: [String],
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("product", ProductsSchema);
