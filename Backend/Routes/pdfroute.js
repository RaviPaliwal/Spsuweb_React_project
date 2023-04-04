const express = require("express");
const router = express.Router();
const uploadPdf = require("../MulterStorage/Pdf");
const PDF = require("../models/Pdfmodel")

router.post("/add", (req, res) => {
  uploadPdf(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      const title = req.body.title; // get the title from the request

      // Delete all PDFs with the same filename/title from the database
      PDF.deleteMany({ filename: title}, function (err) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          // Add the new PDF to the database
          const newPDF = new PDF({
            filename: title,
            path: req.file.path,
          });

          newPDF
            .save()
            .then((pdf) => {
              res.status(200).json({
                message: "PDF file uploaded successfully",
                pdf: pdf,
                fileName: title, // send the filename in the response
              });
            })
            .catch((err) => {
              res.status(500).json({ message: err });
              console.log(err)
            });
        }
      });
    }
  });
});

module.exports = router;
