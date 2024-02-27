const Users = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require("../models/ordersModel");
const Products = require("../models/products.model");

const {
  uploadPhotoCloudinary,
  RemovePhotoCloudinary,
  RemoveMultiplePhotosCloudinary,
} = require("../utils/cloudinary");
const Cart = require("../models/cart.model");
const {
  ValdiateRegister,
  ValdiateLogin,
} = require("../utils/validations/UsersSchema.js");
/**
 * @desc create new user
 * @params POST /api/v1/users/register
 * @access PUBLIC
 **/
exports.register = async (req, res) => {
  try {
    console.log("req.body", req.body);
    // destructuring req.body
    const { username, email, password, role } = req.body;
    // check inputs value is null or not
    // Validating input data from client
    const { error } = ValdiateRegister(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    // throw new Error("Please add all fields");

    // check is useer already registred`
    const existUser = await Users.findOne({ email });
    if (existUser)
      return res.status(400).json({ message: `User already exists` });
    // crypt password
    let salt = bcrypt.genSaltSync(10); // alg of crypt
    let hash = bcrypt.hashSync(password, salt);

    // push new user to document of users in database
    const newUser = await Users.create({
      username,
      email,
      password: hash,
      role,
    });
    // declaration of token and push if in token sign
    const token = await jwt.sign(
      { sub: newUser._id, role },
      process.env.JWT_SECRET
    );
    return res.status(201).json({ data: { token }, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};
/**
 * @desc login user
 * @params POST /api/v1/users/login
 * @access PUBLIC
 **/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validating input data from client
    const { error } = ValdiateLogin(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    // throw new Error("Please add all fields");
    const existUser = await Users.findOne({ email });
    if (!existUser)
      return res.status(400).json({ message: "you shold register first" });
    // check password is correct or not
    const validate = await bcrypt.compare(password, existUser.password);

    if (!validate) return res.status(400).json({ message: "invalid password" });
    const token = jwt.sign(
      { sub: existUser._id, role: existUser.role },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ status: "success", data: { token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong", status: "fail" });
  }
};
/**
 * @desc get All users
 * @params POST /api/v1/admin/users/
 * @access PRIVATE (onlay admin)
 **/
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().select("-password");
    return res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong", status: "fail" });
  }
};

/**
 * @desc get user by id
 * @params POST /api/v1/admin/users/:id
 * @access PRIVATE admin
 **/
exports.getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id)
      .select("-password")

      .populate("orders");
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "user not fount, invalid id" });
    }
    return res.status(200).json({ status: "sucess", data: { user } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};

/**
 * @desc delete all users
 * @params POST /api/v1/admin/users
 * @access PRIVATE admin
 **/
exports.deleteAllUsers = async (req, res) => {
  try {
    const deleteUsers = await Users.deleteMany();
    res.json({ success: true, deleteUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};
/**
 * @desc delete user by id
 * @params POST /api/v1/admin/users/:id
 * @access PRIVATE
 **/
exports.deleteUser = async (req, res) => {
  console.log(req.params.id);
  if (!req.params.id)
    return res.status(400).json({ message: "id params undifend" });
  try {
    // delete all orders of user chossen
    const deleteOrders = await Order.deleteMany({ owner: req.params.id });
    // delete all carts of user chossen
    const deleteCart = await Cart.deleteMany({ owner: req.params.id });

    const deleteUser = await Users.findByIdAndDelete(req.params.id).select(
      "-passwoed"
    );
    res
      .status(200)
      .json({ success: true, message: "user has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};

/**
 * @desc inset photo profile of user
 * @params PUT /api/v1/users/photo/:id
 * @access PRIVATE (owner only)
 **/

exports.insertPhotoUser = async (req, res) => {
  try {
    // console.log("req", req);

    // check is file image exist or not
    if (!req.file) return res.status(400).json({ message: "insert photo" });

    // call uploadPhotoCloudinary function to upload image in Cloudinary
    const ResultCloudinary = await uploadPhotoCloudinary(
      req.file.path, // file upload
      "profile_photo" // dossier for save photo
    );

    const existUser = await Users.findById(req.params.id);
    if (!existUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "user not found, invalid id" });
    }

    const checkOwner = req.params.id === req.userId;

    if (!checkOwner) {
      return res.status(401).json({
        status: "fail",
        message: "unauthorized, you are not owner of this account",
      });
    }

    // user chossen to change his image (user logged in)
    const choosenUser = await Users.findByIdAndUpdate(req.params.id, {
      image: {
        url: ResultCloudinary.secure_url, // url photo
        publicId: ResultCloudinary.public_id, // public id to remove then call RemovePhotoCloudinary function
      },
    });
    // check if user already have image (if true remove old image)
    if (choosenUser.image.publicId !== null) {
      await RemovePhotoCloudinary(choosenUser.image.publicId);
    }

    return res.status(200).json({
      message: "photo profile upload successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something wrong" });
  }
};

/**
 * @desc get user by id
 * @params POST /api/v1/admin/count/
 * @access PRIVATE admin
 **/
exports.getCount = async (req, res) => {
  try {
    const userCount = await Users.count();
    const ordersCount = await Order.count();
    const productsCount = await Products.count();
    return res.status(200).json({
      status: "sucess",
      data: { userCount, ordersCount, productsCount },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};
