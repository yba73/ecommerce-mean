const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// connect to data base
require("./config/connectDB");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(
  "/products",
  express.static(path.join(__dirname, "assets", "images", "products"))
);
app.use(
  "/users",
  express.static(path.join(__dirname, "assets", "images", "users"))
);

// users route
app.use("/api/v1/users", require("./routes/users.routes"));

// // products route
app.use("/api/v1/products", require("./routes/products.routes"));

// // cart route
app.use("/api/v1/carts", require("./routes/carts.routes"));

// // order route
app.use("/api/v1/orders", require("./routes/orders.routes"));

// // order route
app.use("/api/v1/admin", require("./routes/admin.routes"));

//
app.all("*", (req, res) => {
  return res.status(404).json({ status: "fail", message: "url not fount " });
});
// server run
app.listen(process.env.PORT, () => {
  console.log(`server is run on port ${process.env.PORT}`);
});
