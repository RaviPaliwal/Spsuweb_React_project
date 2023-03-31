//url in serve image to be changed while uploading to serve
const fs = require("fs");
const fetchuser = require("../middleware/fetchadmin");
const express = require("express");
const router = express.Router();
const uploadfacultyimage = require("../MulterStorage/UploadFacultyImage");
const path = require("path");
const Faculty = require("../models/Faculty");

router.post("/addfaculty", fetchuser, (req, res) => {
  uploadfacultyimage(req, res, async (err) => {
    if (err) {
      res.json(err);
    } else {
      const ext = path.extname(req.file.originalname);
      const faculty = new Faculty({
        name: req.body.name,
        about: req.body.about,
        post: req.body.post,
        sociallinks:{
          linkedin:req.body.linkedin,
          instagram:req.body.instagram,
          gmail:req.body.gmail,
          vidvan:req.body.vidvan,
        },
        image: {
          extention: ext,
          path: "/images/" + req.body.title + ext,
          data: req.file.filename,
          contentType: "image/png/jpg/jpeg",
        },
      });
      await faculty
        .save()
        .then(() => {
          res.json({ responce: "Successfully Added New Faculty" });
        })
        .catch((err) => {
          res.json(err);
          const path = `./Uploads/FacultyImages/${req.body.title + ext}`;
          fs.unlink(path, async (err) => {
        if (err) {
          console.error(err);
          res.json({ success: false, responce: "Something Went Wrong" });
          return;
        }
        });
        });
    }
  });
});



  router.get("/getfaculty", async (req, res) => {
    try {
      const faculty = await Faculty.find({});
      res.json(faculty);
    } catch (err) {
      res.json(err);
    }
  });

  router.post("/deletefaculty", fetchuser, async (req, res) => {
    const item = await Faculty.findOne({ name: req.body.name });
    if (item) {
      const path = `./Uploads/FacultyImages/${req.body.name + item.image.extention}`;
      fs.unlink(path, async (err) => {
        if (err) {
          console.error(err);
          res.json({ success: false, responce: "Something Went Wrong" });
          await Faculty.deleteMany({ name: req.body.name });
          return;
        } else {
          await Faculty.deleteMany({ name: req.body.name });
          res.json({ responce: "Deleted Slide Successfuly", success: true });
        }
      });
    } else {
      res.json({ responce: "Slide Title Not Found" });
    }
  });


module.exports = router;
