const multer = require("multer");
const path = require("path");
const ImageStorage = multer.diskStorage({
  destination: "Uploads/Images",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.body.title + ext);
  },
});

const uploadimage = multer({ storage: ImageStorage }).single("image");

module.exports = uploadimage;
