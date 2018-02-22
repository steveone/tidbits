
const videos = require('express').Router();


const Video= require('../models/video');


videos.get('/create', (req,res,next)=>{
  res.render('videos/create');
})

videos.post('/create', async (req,res,next) => {

    const {title, description, url} = req.body;
    const newVideo = new Video({title, description, url});
    newVideo.validateSync();
    if (newVideo.errors) {
      res.status(400).render('videos/create', {newVideo: newVideo, "error": "Missing Title"});
    } else {
      let videos = await newVideo.save();
      let url = '/videos/' + videos._id;
      res.redirect(302,url);
    }
  });

 videos.get('/:id', async (req,res,next) => {
   const id = req.params.id;
   const videos = await Video.findOne({_id:id});
   res.locals.title = videos.title;
   res.locals.description = videos.description;
   res.locals.url = videos.url;
   res.render('videos/show');
 })

 videos.get('/', async (req,res,next) => {
    const videos = await Video.find({});
    res.render('videos/index',{videos});
  })

module.exports = videos;
