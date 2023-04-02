const express = require("express");
const User = require("../models/Admin");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchadmin = require("../middleware/fetchadmin");

const JWT_SECRET = "spsuis$gooduniversity";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/signup",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ msg: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        username: req.body.username,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      res.json({msg:"New Admin Signed Up",token: authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({msg: "Something Went wrong"});
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      res.status(500).json({ success: false, err: error });
    }
  }
);

// ROUTE 3: Delete
router.post("/deleteuser", fetchadmin, async (req, res) => {
  try {
    id = req.body.email;
    password= req.body.password;
    const user = await User.findOne({email: id})
    if(user){
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(passwordCompare){
      const r=await User.findOneAndDelete({email: id}) //tHIS LINE NOT WORKING
      //console.log(r);
      res.json({msg:`Account ${user.username} Deleted Successfully`});
      return;
    }
    if(!passwordCompare){
      res.json({msg:`{User Password is Wrong Try Again`});
      return;
    }}
    else{
      res.json({msg:"Sorry This User Doesn't Exists"})
    }
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg:"Internal Server Error"});
  }
});






// ROUTE 4: Get all Admins' data
router.get("/admins", fetchadmin, async (req, res) => {
  try {
    const users = await User.find({}, { username: 1, email: 1 });
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg:"Internal Server Error"});
  }
});
module.exports = router;
