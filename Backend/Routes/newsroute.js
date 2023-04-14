const express = require('express');
const path = require('path')
const router = express.Router();
const News = require('../models/News');
const uploadnewsimage = require('../MulterStorage/Uploadnews');
const fs = require('fs')
// CREATE a new news article
router.post('/add', uploadnewsimage, async (req, res) => {
    const img = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        extention: path.extname(req.file.originalname),
        path: req.body.mypath,
      };
  try {
    const news = new News({
      title: req.body.title,
      description: req.body.description,
      image:img
    });
    const savedNews = await news.save();
    res.json(savedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all news articles
router.get('/getall', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE a news article
router.delete('/:id', async (req, res) => {
  const item = await News.findById(req.params.id)
  if(item){
    const path = item.image.path.replace('/images/','./Uploads/NewsImages/');
    try {
      fs.unlink(path,async (err)=>{
        if(err){
          console.log(err);
          await News.deleteOne({_id:item._id})
          res.json({ message: 'News article Deleted but IMAGE Not found' });
          return;
        }
        else{
          await News.deleteOne({_id:item._id})
          res.json({ message: 'News article deleted' });
        }
      });
      
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    

  }
});

// middleware function to get a news article by ID
async function getNews(req, res, next) {
  try {
    const news = await News.findById(req.params.id);
    if (news == null) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.news = news;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
