const Cart = require("../models/cart.model");
const Products = require("../models/products.model");
const Users = require("../models/users.model");

/**
 * @desc add product in cart
 * @params POST /api/v1/cart/:id
 * @access PRIVATE owner (user connect)
 **/
exports.addProductInCart = async (req, res) => {
  try {
    // get productsChoosen by id
    const productChoosen = await Products.findById(req.params.id);
    if (!productChoosen)
      return res.status(400).json({ message: "product not in list" });
    if (!productChoosen.count) {
      return res
        .status(400)
        .json({ status: "fail", message: "product not available" });
    }
    const existProduct = await Cart.findOne({
      owner: req.userId, // get owenr (usre connected) cart
      product: productChoosen._id, // check product in cart or note
    });
    // exist product true (product in cart) , exist.length because return empty array [] and is true
    if (existProduct) {
      return res.status(400).json({ message: "product already in cart" });
    }

    let quantity = 1;
    const products = await Cart.create({
      product: productChoosen._id, // id product or req.params.id to populate then get cart
      owner: req.userId, // id user connect, to populate then get cart
      quantity,
      title: productChoosen.title,
      image: { url: productChoosen.image.url },
      price: productChoosen.price,
      total: parseInt(productChoosen.price),
    });

    const updatedPorduct = await Products.findByIdAndUpdate(req.params.id, {
      count: productChoosen.count - 1,
    });
    return res.json({
      status: "success",
      message: "product has been add in cart successfully",
    });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({ status: "fail", message: "something wrong" });
  }
};
/**
 * @desc get all carts
 * @params GET /api/v1/cart/
 * @access PRIVATE admin
 **/
exports.getAllCarts = async (req, res) => {
  try {
    const CartProducts = await Cart.find()

      .populate("owner", "username")
      .populate("product");

    if (!CartProducts.length)
      return res.status(401).json({ message: "cart is empty" });
    res.json(CartProducts);
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({ status: "fail", message: "something wrong" });
  }
};

/**
 * @desc get user products  from cart
 * @params GET /api/v1/cart/:id
 * @access PRIVATE owner (user connect)
 **/
exports.getCartUserProducts = async (req, res) => {
  try {
    const cart = await Cart.find({ owner: req.params.id })
      .select("-title -image")

      .populate("owner", "username image")
      .populate("product");

    const checkOwner = req.params.id === req.userId;
    if (!checkOwner) {
      return res
        .status(401)
        .json({ status: "fail", message: "you are not owner of this cart" });
    }

    return res.status(200).json({ status: "success", data: { cart } });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({ status: "fail", message: "something wrong" });
  }
};

/**
 * @desc update cart
 * @params PUT /api/v1/cart/:id
 * @access PRIVATE owner (user connect)
 **/
exports.updateUserCart = async (req, res) => {
  try {
    const { payload } = req.body;
    if (!payload)
      return res.status(400).json({ staatus: 400, message: "invalid payload" });
    //check product in product list or not
    const productChoosen = await Products.findById(req.params.id);
    if (!productChoosen)
      return res
        .status(400)
        .json({ message: "product not in list of products", status: "fail" });

    //check the identity of the owner of the cart
    const existtOwnerCart = await Cart.findOne({ owner: req.userId });

    if (!existtOwnerCart)
      return res
        .status(404)
        .json({ message: "user d'ont have any cart", status: "fail" });

    // check ower cart for change qunatity of product
    const productOwnerInCartChoosen = await Cart.findOne({
      owner: req.userId,
      product: req.params.id,
    });

    //check product in product list or not
    if (!productOwnerInCartChoosen)
      return res.status(401).json({
        message: "authorized your are not owenr of this cart",
        status: "fail",
      });

    // check count of productchoosen

    if (!productChoosen.count && parseInt(payload) === 1) {
      return res
        .status(400)
        .json({ status: "fail", message: "product not not available yet" });
    }

    const quantity = productOwnerInCartChoosen.quantity + parseInt(payload);
    if (!quantity) {
      return res
        .status(400)
        .json({ message: "quantity of product some be great then 1" });
    }

    // get cart owener connected
    const cartChoosen = await Cart.updateOne(
      { owner: req.userId, product: req.params.id },
      {
        // id user connect, to populate then get cart
        quantity,
        total: quantity * productChoosen.price,
      }
    );

    const updatedProductChoosenQun = await Products.findByIdAndUpdate(
      req.params.id,
      {
        count: productChoosen.count - parseInt(payload),
      }
    );
    return res.status(200).json({
      status: "success",
      message: "qunatity has been changed success",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "fail", message: "something  wrong" });
  }
};
/**
 * @desc delete product by id from cart
 * @params DELETE /api/v1/cart/:id
 * @access PRIVATE owner (user connect)
 **/
exports.deleteProductInCart = async (req, res) => {
  try {
    // or send id of cart
    // check product in products list or not
    const existProduct = await Products.findById(req.params.id);
    if (!existProduct)
      return res
        .status(400)
        .json({ message: "product not in list of products" });
    // check owner is have cart or cart is emty
    const existCartOwner = await Cart.findOne({ owner: req.userId });
    if (!existCartOwner)
      return res.status(404).json({ message: "user d'ont have any cart" });
    // check product choosen is in  cart or not
    const existProductInCart = await Cart.findOne({
      product: req.params.id,
      owner: req.userId,
    });
    if (!existProductInCart)
      return res
        .status(401)
        .json({ message: "you are not owner of this cart" });
    const deletePrdoduct = await Cart.deleteOne({
      owner: req.userId,
      product: req.params.id,
    });

    const updateCountProduct = await Products.findByIdAndUpdate(req.params.id, {
      count:
        parseInt(existProduct.count) + parseInt(existProductInCart.quantity),
      isInCart: false,
    });
    return res
      .status(200)
      .json({ status: "success", message: "product has been deleted success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "fail", message: "something  wrong" });
  }
};

/**
 * @desc delete all products in cart user
 * @params DELETE /api/v1/cart/:id
 * @access PRIVATE owner (user connect)
 **/
exports.deleteAllProductsInCart = async (req, res) => {
  try {
    // check
    const existUser = await Users.findById(req.params.id);

    if (!existUser) {
      return res.status(400).json({
        status: "fail",
        message: "user not found",
      });
    }

    const checkOwner = req.params.id === req.userId;
    if (!checkOwner)
      return res.status(401).json({
        message: "you are not authorized ,your are not owner of this cart",
      });

    checkIfCartIsEmpty = await Cart.findOne({
      owner: req.params.id,
    });

    if (!checkIfCartIsEmpty) {
      return res
        .status(404)
        .json({ status: "fail", message: "your cart is emty" });
    }

    const cartOwner = await Cart.find({
      owner: req.params.id,
    }).populate("product");
    const cart = cartOwner.map(async (item) => {
      console.log("item.count", item.product.count);
      console.log("item.", item);

      console.log("qunatity", item.quantity);
      const count = item.product.count + item.quantity;

      console.log("count", count);
      const updatedPrdocutCount = await Products.findByIdAndUpdate(
        item.product._id,
        {
          count,
        }
      );
    });
    const deleteAllProducts = await Cart.deleteMany({ owner: req.params.id });

    return res
      .status(200)
      .json({ status: "success", message: "cart has been deleted success" });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({ status: "fail", message: "something wrong" });
  }
};

/**
 * @desc delete all cart
 * @params DELETE /api/v1/admin/cart/
 * @access PRIVATE admin
 **/

exports.deleteAllCarts = async (req, res) => {
  try {
    const deleteCarts = await Cart.deleteMany();
    res.json({ success: true, deleteCarts });
  } catch (error) {
    res.status(500).json("something wrong");
    throw new Error(error);
  }
};
