const multer = require("multer");
const path = require("path");
const FacultyImage = multer.diskStorage({
  destination: "Uploads/FacultyImages",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.body.title + ext);
  },
});

const uploadfacultyimage = multer({ storage: FacultyImage }).single("image");
module.exports = uploadfacultyimage;
