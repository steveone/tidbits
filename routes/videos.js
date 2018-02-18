
const videos = require('express').Router();

const Video= require('../models/video');


videos.post('/', async (req,res,next) => {
  console.log("asdfasdf");
    const {title, description, url} = req.body;
    const newVideo = new Video({title, description, url});
    newVideo.validateSync();
    if (newVideo.errors) {
      res.status(400).render('create', {newVideo: newVideo});
    } else {
      await newVideo.save();
      res.redirect('/');
    }
  });

module.exports = videos;
