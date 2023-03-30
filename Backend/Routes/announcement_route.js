const fetchuser = require("../middleware/fetchadmin");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Announcement = require("../models/Announcement");

router.post(
  "/add",
  fetchuser,
  [
    body("info", "Atleat have 10 characters").isLength({ min: 10 }),
    body("Title", "Cannot Be Empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const duplicate = await Announcement.findOne({
        info: req.body.info,
        title: req.body.title,
      });
      const duplicate1 = await Announcement.findOne({ info: req.body.info });
      const duplicate2 = await Announcement.findOne({ title: req.body.title });
      if (duplicate != null || duplicate1 != null || duplicate2 != null) {
        if (duplicate != null) {
          return res.json({ responce: "Duplicate Data" });
        }
        if (duplicate1 != null) {
          return res.json({ responce: "Duplicate Info" });
        }
        if (duplicate2 != null) {
          return res.json({ responce: "Duplicate Title" });
        }
      } else {
        const object = new Announcement(req.body);
        await object.save();
        res.json({ responce: "Announcement Added Successfully" });
      }
    } catch (err) {
      res.json({ responce: "Something Went Wrong." });
    }
  }
);

//find by month-year
//http://localhost:5000/api/announcement/getbymonth-year/2-2023
router.get("/getbymonth-year/:month", async (req, res) => {
  try {
    let range = req.params.month;
    const content = await Announcement.find({ date: range }).sort({
      timestamp: -1,
    });
    res.send(content);
  } catch (err) {
    res.json(err, { responce: "Some Error Occurd" });
  }
});

//find by month-year
//http://localhost:5000/api/announcement/getall
router.get("/getall", async (req, res) => {
  try {
    const content = await Announcement.find().sort({ timestamp: -1 });
    res.send(content);
  } catch (err) {
    res.send(err);
  }
});

//Delete by month-year
//http://localhost:5000/api/announcement/deletebymonth-year/2-2023
router.post("/deletebymonth-year/:month", fetchuser, async (req, res) => {
  try {
    let param = req.params.month;
    await Announcement.deleteMany({ date: param });
    res.send("Deleted all having date" + param);
  } catch (err) {
    res.send(err);
  }
});

router.post("/deletebytitle", fetchuser, async (req, res) => {
  try {
    const a = await Announcement.findOne({ title: req.body.title });
    if (a) {
      await Announcement.deleteMany({ title: req.body.title });
      res.send("Deleted " + req.body.title);
    } else {
      res.send("No Announcement found");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
