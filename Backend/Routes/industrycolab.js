const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const uploadimage = require('../MulterStorage/Upload');
const IndustryCollaboration = require('../models/IndustryColabsSchema');

// POST /api/industry-collaborations
// Add new Industry Collaboration
router.post('/industry-colaborations', uploadimage, async (req, res) => {
  try {
    
    const {title, description } = req.body;
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      extention: path.extname(req.file.originalname),
      path: "/images/" + req.body.title +path.extname(req.file.originalname) ,
    };
    const newIndustryCollaboration = new IndustryCollaboration({
      title,
      description,
      image,
    });
    await newIndustryCollaboration.save();
    res.json({msg:"Successfully Added"+title});
  } catch (error) {
    const test = IndustryCollaboration.findOne({title:req.body.title});
    if(test){
        res.json({msg:"Duplicate Title"});
        return;
    }
    console.error(error);
    res.status(500).json({msg:"Internal Server Error"});
  }
});

// GET /api/industry-collaborations
// Get all Industry Collaborations
router.get('/industry-colaborations', async (req, res) => {
  try {
    const industryCollaborations = await IndustryCollaboration.find();
    res.json(industryCollaborations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// DELETE /api/industry-collaborations
// Delete Industry Collaboration by title
router.delete('/industry-colaborations', async (req, res) => {
  try {
    const { title } = req.body;
    const industryCollaboration = await IndustryCollaboration.findOne({ title });
    if (!industryCollaboration) {
      return res.status(404).json({ msg: 'Industry collaboration not found' });
    }
    const imagePath = `./Uploads/${industryCollaboration.image.path}`;
    fs.unlink(imagePath, (err) => {
      if (err) console.error(err);
    });
    await industryCollaboration.remove();
    res.json({ msg: 'Industry collaboration removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});
  

module.exports = router;
