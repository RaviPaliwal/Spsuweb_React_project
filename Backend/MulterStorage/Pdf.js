const multer = require("multer");
const path = require("path");

const pdfStorage = multer.diskStorage({
  destination: "Uploads/PDFs",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.body.title+ext);
  },
});

const uploadPdf = multer({ storage: pdfStorage }).single("pdf");

module.exports = uploadPdf;
