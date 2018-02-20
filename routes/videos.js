
const videos = require('express').Router();


const Video= require('../models/video');


videos.get('/create', (req,res,next)=>{
  res.render('videos/create');
})

videos.getVideos = async ()=>{
  console.log("Returning videos");
  const videos = await Video.find({});
  console.log(videos);
  res.render('../index',{videos});
}

videos.post('/create', async (req,res,next) => {

    const {title, description, url} = req.body;
    const newVideo = new Video({title, description, url});
    newVideo.validateSync();
    if (newVideo.errors) {
      res.status(400).render('create', {newVideo: newVideo});
    } else {
      await newVideo.save();
      //res.status(201).send(newVideo.title).end();
      res.locals.title = newVideo.title;
      res.locals.description = newVideo.description;
      res.locals.url = newVideo.url;
      res.render('videos/show');
    }
  });

module.exports = videos;
