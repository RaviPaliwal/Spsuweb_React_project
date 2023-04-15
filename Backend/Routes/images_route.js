//url in serve image to be changed while uploading to serve
const fs = require("fs");
const fetchuser = require("../middleware/fetchadmin");
const express = require("express");
const router = express.Router();
const uploadImage = require("../MulterStorage/Upload");
const ImageModel = require("../models/Images");
const path = require("path");
const e = require("express");

router.post("/upload", fetchuser, (req, res) => {
  uploadImage(req, res, async (err) => {
    if (err) {
      res.json(err);
    } else {
      const ext = path.extname(req.file.filename);
      const Img = new ImageModel({
        title: req.body.title,
        catagory: req.body.catagory,
        image: {
          extention: ext,
          data: req.file.filename,
          contentType: "image/png/jpg/jpeg",
        },
      });
      await Img.save()
        .then(() => {
          res.json({ data: "Successfully Uploaded" });
        })
        .catch((err) => {
          res.json(err);
        });
    }
  });
});

router.get("/getbytitle", async (req, res) => {
  const a = await ImageModel.findOne({ title: req.body.title });
  if (a) {
    res.json({
      url: "http://34.125.182.92/images/" + a.title + a.image.extention,
    });
  } else {
    res.json({ url: null });
  }
});

router.post("/deletebytitle", fetchuser, async (req, res) => {
  const item = await ImageModel.findOne({ title: req.body.title });
  if (item) {
    const path = `./Uploads/Images/${req.body.title + item.image.extention}`;
    fs.unlink(path, async (err) => {
      if (err) {
        console.error(err);
        res.json({ success: false });
        return;
      } else {
        await ImageModel.deleteMany({ title: req.body.title });
        res.json({ success: true });
      }
    });
  } else {
    res.json("File Not Found");
  }
});

module.exports = router;
