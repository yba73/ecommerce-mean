const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    // cart: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "cart",
    //   required: true,
    // },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    cart: {
      type: Array,
      ref: "product",

      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },

    totalamount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    livraison: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success"], // enum: role adimn or customer else error
      default: "pending",
    },
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true }, // virtuals
    // toObject: { virtuals: true }, // virtuals
  }
);

// populate posts the belongs to this user when he/she get his/her profile
// orderSchema.virtual("products", {
//   ref: "product", // ref post model
//   foreignField: "owner", // field out in ref model (post)
//   localField: "owner", // filed local id

//   // compar field out and filed local and set fields in filed name posts to this model
// });
module.exports = new mongoose.model("order", orderSchema);
