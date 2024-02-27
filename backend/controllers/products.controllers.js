const Products = require("../models/products.model");
const Cart = require("../models/cart.model");

const { uploadPhotoCloudinary } = require("../utils/cloudinary");
const {
  ValdiateCreateUdateProduct,
} = require("../utils/validations/ProductsSchema");
/**
 * @desc add new product
 * @params POST /api/v1/admin/products/
 * @access PRIVATE admin
 **/
exports.addnewproduct = async (req, res) => {
  try {
    const { title, description, price, count } = req.body;

    const genre = req.body.genre.split(",");

    // validate data from client
    const { error } = ValdiateCreateUdateProduct(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    console.log("raq file", req.file.path);
    if (!req.file)
      return res.status(400).json({ message: "no image provided" });
    // call uploadPhotoCloudinary function to upload image in Cloudinary
    const ResultCloudinary = await uploadPhotoCloudinary(
      req.file.path, // file upload
      "books" // dossier for save photo
    );
    console.log("ResultCloudinary", ResultCloudinary.secure_url);

    const product = await Products.create({
      title: title.trim().toLowerCase(),
      description,
      price,
      image: {
        url: ResultCloudinary.secure_url, // url photo
        publicId: ResultCloudinary.public_id, // public id to remove then call RemovePhotoCloudinary function
      },
      genre,
      count,
    });
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};
/**
 * @desc GET all products
 * @params GET /api/v1/admin/products , GET /api/v1/products
 * @access PRIVATE  admin and owner
 **/
exports.getAllProducts = async (req, res) => {
  try {
    const currentPage = req.query.currentPage || 1;
    const PRODUCT_PER_PAGE = req.query.limit || 3;
    const sort = req.query.sort || "lastes";
    const size = req.query.size || "ALL";
    const title = req.query.title?.trim().toLowerCase() || "";

    // declaration productsSortAndFiliterSize
    let products = [];
    if (sort === "lowest") {
      products = await Products.find({
        availableSizes: size, // filter products by size
        title: { $regex: title }, // filter products by title
      })
        .sort({ price: 1 }) // sort products by price
        .skip((currentPage - 1) * PRODUCT_PER_PAGE)
        .limit(PRODUCT_PER_PAGE) // pagination
        .select("-password");
    } else if (sort === "highest") {
      products = await Products.find({
        availableSizes: size, // filter products by size
        title: { $regex: title }, // filter products by title
      })
        .sort({ price: -1 })
        .skip((currentPage - 1) * PRODUCT_PER_PAGE) // pagination
        .limit(PRODUCT_PER_PAGE) // pagination
        .select("-password");
    } else {
      products = await Products.find({
        availableSizes: size,
        title: { $regex: title },
      })
        .sort({ createdAt: -1 }) // sort product par page
        .skip((currentPage - 1) * PRODUCT_PER_PAGE) // pagination
        .limit(PRODUCT_PER_PAGE) // pagination
        .select("-password");
    }
    // all products length to show in admin page
    const productsLength = (await Products.find()).length;
    const allProducts = await Products.find();
    // pagination
    // filter products by size to get length of products befor pagination (skip and limit because products length change)
    const productSize = await Products.find({ availableSizes: size });
    // count pages for pagination front
    const pages = Math.ceil(productSize.length / PRODUCT_PER_PAGE);
    res.json({
      products,
      pages,
      countProducts: productSize.length,
      productsLength,
      allProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something wrong" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    return res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something wrong" });
  }
};

/**
 * @desc GET  product by id
 * @params GET /api/v1/admin/products/:id, GET /api/v1/products/:id
 * @access PRIVATE admin ans owner
 **/
exports.getPrductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.json({ status: "sucess", data: { product } });
  } catch (error) {
    console.log(error);
    res.json("somthing wrong");
  }
};
/**
 * @desc update product by id
 * @params PUT /api/v1/admin/products/:id
 * @access PRIVATE admin
 **/
exports.updateProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const imagePath = `http://localhost:5000/products/${
      req.file?.filename || "defaulut-avatar.png"
    }`;
    const productChoosen = await Products.findByIdAndUpdate(req.params.id, {
      title: title.trim().toLowerCase(),
      description,
      price,
      image: imagePath,
    });
    res.json(productChoosen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};
/**
 * @desc Delete all products
 * @params POST /api/v1/admin/products/
 * @access PRIVATE
 **/
exports.deleteAllProducts = async (req, res) => {
  try {
    const products = await Products.deleteMany();
    res.json(products);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
/**
 * @desc Delete product by id
 * @params POST /api/v1/admin/products/:id
 * @access PRIVATE
 **/
exports.deleteProductById = async (req, res) => {
  try {
    const products = await Products.findByIdAndDelete(req.params.id);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};
exports.addCount = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, {
      count: 4,
    });
    return res.json({
      status: "fail",
      message: "count addet successfully",
      data: { product },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong" });
  }
};
