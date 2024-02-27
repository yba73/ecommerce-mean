const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // check is email alrady exist
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        publicId: null,
      },
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "customer"], // enum: role adimn or customer else error
      default: "customer",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // virtuals
    toObject: { virtuals: true }, // virtuals
  } // create tima and update time
);
// populate posts the belongs to this user when he/she get his/her profile
userSchema.virtual("orders", {
  ref: "order", // ref post model
  foreignField: "owner", // field out in ref model (post)
  localField: "_id", // filed local id

  // compar field out and filed local and set fields in filed name posts to this model
});

module.exports = mongoose.model("user", userSchema);
