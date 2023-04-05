//url in serve image to be changed while uploading to serve
const fs = require("fs");
const fetchuser = require("../middleware/fetchadmin");
const express = require("express");
const router = express.Router();
const uploadcarouselslide = require("../MulterStorage/UploadCarouselSlide");
const path = require("path");
const Carousel = require("../models/Carousel");

router.post("/addslide", fetchuser, async (req, res) => {
  uploadcarouselslide(req, res, async (err) => {
    if (err) {
      res.json({ responce: "Something Went Wron 2g", err });
    } else {
      const ext = path.extname(req.file.originalname);
      const slide = new Carousel({
        title: req.body.title,
        info: req.body.info,
        image: {
          extention: ext,
          path: "/images/" + req.body.title + ext,
          data: req.file.filename,
          contentType: "image/png/jpg/jpeg",
        },
      });
      await slide
        .save()
        .then(() => {
          res.json({ responce: "Successfully Uploaded Carousel Slide" });
        })
        .catch(async (err) => {
          const d = await Carousel.findOne({ title: req.body.title });
          if (d) {
            res.json({
              responce: "Duplicate Slide Please Try With Different Title",
              err,
            });
            return;
          }
          res.status(500).json({ responce: "Internal Server Error", err });
        });
    }
  });
});
router.post("/deleteslidebytitle", fetchuser, async (req, res) => {
  const item = await Carousel.findOne({ title: req.body.title });
  if (item) {
    const path = `./Uploads/Carousel/${req.body.title + item.image.extention}`;
    fs.unlink(path, async (err) => {
      if (err) {
        console.error(err);
        res.json({ success: false, responce: "Something Went Wrong" });
        await Carousel.deleteMany({ title: req.body.title });
        return;
      } else {
        await Carousel.deleteMany({ title: req.body.title });
        res.json({ responce: "Deleted Slide Successfuly", success: true });
      }
    });
  } else {
    res.json({ responce: "Slide Title Not Found" });
  }
});

router.get("/getslides", async (req, res) => {
  try {
    const item = await Carousel.find().sort({ timestamp: -1 });
    res.json(item);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
