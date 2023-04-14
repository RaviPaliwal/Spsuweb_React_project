const multer = require("multer");
const path = require("path");
const ImageStorage = multer.diskStorage({
  destination: "Uploads/NewsImages",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.body.title.replace(/\s+/g, "_") + Date.now() + ext);
    req.body.mypath= "/images/" + req.body.title.replace(/\s+/g, "_") + Date.now() + ext;

  },
});

const uploadnewsimage = multer({ storage: ImageStorage }).single("image");

module.exports = uploadnewsimage;
