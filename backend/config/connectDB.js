const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("data base connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });
