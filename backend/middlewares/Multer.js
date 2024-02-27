const multer = require("multer");
/*=========== Multer  ================*/
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const imageName = Date.now() + "-" + file.originalname;
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

/*===========// Multer  //==============*/

module.exports = { upload, storage };
