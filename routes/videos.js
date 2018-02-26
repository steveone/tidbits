
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
      res.status(400).render('videos/create', {newVideo: newVideo, "error": newVideo.errors});
    } else {
      let videos = await newVideo.save();
      let url = '/videos/' + videos._id;
      res.redirect(302,url);
    }
  });

  videos.get('/show/:id', async (req,res,next) => {
    console.log("get show request");
    const id = req.params.id;
    const videos = await Video.findById(id);
    res.locals.title = videos.title;
    res.locals.description = videos.description;
    res.locals.url = videos.url;
    res.locals._id = req.params.id;
    res.render('videos/show');
  })

  videos.get('/:id/edit', async (req,res,next) => {
    const id = req.params.id;
    const videos = await Video.findById(id);
    res.locals.title = videos.title;
    res.locals.description = videos.description;
    res.locals.url = videos.url;
    res.locals.id = req.params.id;
    res.render('videos/edit');
  })

  videos.post('/:id/updates', async (req,res,next) => {
    const id = req.params.id;
    const {title, description, url} = req.body;
    const newVideo = new Video({title, description, url});
    newVideo.validateSync();
    if (newVideo.errors) {
      res.locals.title = title;
      res.locals.description = description;
      res.locals.url = url;
      res.locals.id = req.params.id;
      res.status(400).render('videos/edit', {newVideo: newVideo, "error": newVideo.errors});
    } else {
      const videos = await Video.findById(id, function (err, videos) {
      if (err) return handleError(err);
      videos.title = title;
      videos.save(function (err, videos) {
      if (err) {
          const url = 'videos/' + id + '/update'
          res.status(400).render(url, {newVideo: videos, "error": videos.errors});
          }
        })
      })
    res.locals.title = videos.title;
    res.locals.description = videos.description;
    res.locals.url = videos.url;
    res.locals._id = req.params.id;
    const Url = '/videos/show/' + id;
    res.redirect(302,Url);
    }
  });

  videos.post('/:id/deletions', async (req,res,next) => {
    const id = req.params.id;
    const videos = await Video.findById(id).remove().exec();
    const Url = '/';
    res.redirect(Url);
    return next;
  });


 videos.get('/:id', async (req,res,next) => {
   const id = req.params.id;
   const videos = await Video.findById(id);
   res.locals.title = videos.title;
   res.locals.description = videos.description;
   res.locals.url = videos.url;
   res.locals._id = req.params.id;
   res.render('videos/show');
 })

 videos.get('/', async (req,res,next) => {
    const videos = await Video.find({});
    res.render('videos/index',{videos});
  })

module.exports = videos;
