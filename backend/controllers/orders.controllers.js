const Orders = require("../models/ordersModel");
const Cart = require("../models/cart.model");
const Users = require("../models/users.model");
const { valdiateSendOrder } = require("../utils/validations/ordes.schema");

/**
 * @desc add order in orders
 * @params POST /api/v1/orders/
 * @access PRIVATE owner (user connect)
 **/
exports.newOrder = async (req, res) => {
  try {
    const { address, phone, livraison } = req.body;
    const { error } = valdiateSendOrder(req.body);

    const cartOwner = await Cart.find({ owner: req.params.id });
    if (!cartOwner.length)
      return res.status(400).json({ message: "you dont have a order" });
    const totalamount = cartOwner.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );
    const total = livraison ? totalamount + 30 : totalamount;

    const newOrder = await Orders.create({
      owner: req.params.id,
      totalamount,
      address,
      phone,
      total,
      cart: cartOwner,
      livraison,
    });
    const deleteUserCart = await Cart.deleteMany({ owner: req.params.id });
    return res
      .status(201)
      .json({ status: "success", message: "order has been send success" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ status: "fail", message: "something wrong" });
  }
};

/**
 * @desc get All orders
 * @params GET /api/v1/admin/orders/
 * @access PRIVATE admin
 **/

exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await Orders.find().populate(
      "owner",
      "username email image"
    );

    return res.status(200).json({
      status: "sucess",
      data: {
        allOrders,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "something wrong" });
  }
};

/**
 * @desc get user orders
 * @params GET /api/v1/admin/orders/:id
 * @access PRIVATE admin
 **/

exports.getUserOrders = async (req, res) => {
  try {
    const checkExistUser = await Users.findById(req.params.id);
    if (!checkExistUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "user not found, invalid id" });
    }
    const orders = await Orders.find({ owner: req.params.id }).populate(
      "owner",
      "username email"
    );

    return res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "something wrong" });
  }
};

/**
 * @desc update order in orders
 * @params PUT /api/v1/cart/orders/
 * @access PRIVATE owner (user connect)
 **/
exports.updateOrder = async (req, res) => {
  try {
    const cartOwner = await Cart.findOne({ owner: req.userId });
    if (!cartOwner)
      return res.status(400).json({ message: "you dont have a cart" });
    const existOrder = await Orders.findOne({ owner: req.userId });
    if (!existOrder)
      return res.status(400).json({ message: "you dont have a order" });
    const totalamount = cartOwner.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );

    const updateOrder = await Orders.findByIdAndUpdate(existOrder._id, {
      owner: req.userId,
      totalamount,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

/**
 * @desc delete All  orders
 * @params DELETE /api/v1/admin/orders/
 * @access PRIVATE admin
 **/
exports.deleteAllOrders = async (req, res) => {
  try {
    const deleteAll = await Orders.deleteMany();
    res.status(200).json({ success: true, deleteAll });
  } catch (error) {
    res.status(500).json({ message: "something wrong" });
  }
};

/**
 * @desc delete selecte order user (one)
 * @params DELETE  /api/v1/admin/orders/users/:id
 * @access PRIVATE owner
 **/
exports.deleteUserOrder = async (req, res) => {
  try {
    const existOrder = await Orders.findById(req.params.id);
    if (!existOrder) {
      return res.status(404).json({ message: "order not found" });
    }

    const deleteOrder = await Orders.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "success",
      message: "order has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "something wrong", status: "fil" });
  }
};

/**
 * @desc delete All User  orders
 * @params DELETE /api/v1/admin/orders/owner/All
 * @access PRIVATE owner
 **/
exports.deleteAllUserOrder = async (req, res) => {
  try {
    const existOrder = await Orders.findOne({ owner: req.userId });
    if (!existOrder)
      return res.status(400).json({ message: "user d'ont have a order" });
    const deleteAll = await Orders.deleteMany({ owner: req.userId });
    res.status(200).json({ success: true, deleteAll });
  } catch (error) {
    res.status(500).json({ message: "something wrong" });
  }
};
