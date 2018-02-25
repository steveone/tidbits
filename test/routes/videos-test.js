const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const Video = require('../../models/video');
const {parseTextFromHTML} = require('../test-util');



const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const app = require('../../app');

describe('Server path: /', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

 describe('Server path: / renders videos',() =>{

   it ('returns videos from database on /videos route', async () =>{

     const newVideoToAdd = {
       title: 'Unit testing',
       description: 'What is Unit Testing',
       url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
     }
     let newVideo = new Video(newVideoToAdd);
     await newVideo.save();
     const response = await request(app)
     .get('/videos')
     .redirects(1); //allows handling of redirect
     assert.equal(parseTextFromHTML(response.text, '.video-title'), newVideoToAdd.title);
     assert.equal(parseTextFromHTML(response.text, '.video-description'), newVideoToAdd.description);
     let urlContainer = jsdom(response.text).querySelector('.video-player');
     assert.equal(urlContainer.src, newVideoToAdd.url);

   })
 })

 describe('Server path: / does not render video if no title exists',() =>{
   it('returns no video if a video is submitted without a title', async ()=>{
   const newVideoToAdd = {
     description: 'What is Unit Testing',
     url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
   }
   let newVideo = new Video(newVideoToAdd);
   newVideo.add;
   //it ('returns videos from database on / route', async () =>{
     const response = await request(app)
     .get('/videos')
     .redirects(1); //allows handling of redirect
     assert.equal(parseTextFromHTML(response.text, '#videos-container'), '');
   //})
  })
 })

 describe('Server path: /videos/:id',() =>{
   it('returns video for given id', async ()=>{
   const newVideoToAdd = {
     title: 'New test video',
     description: 'What is Unit Testing',
     url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
   }
   let newVideo = new Video(newVideoToAdd);
   const newVid = await newVideo.save(function(err,video) {
     return video.id;
      });
//  console.log(newVid._id);
     let url = '/videos/' + newVid.id;
     const response = await request(app)
     .get(url)
     .redirects(1); //allows handling of redirect
     assert.equal(parseTextFromHTML(response.text, '.video-title'), newVideoToAdd.title);
     let urlContainer = jsdom(response.text).querySelector('.video-player');
     assert.equal(urlContainer.src, newVideoToAdd.url);
  })
 })

});

describe('videos create path returns',()=>{
  describe('tries to create a video without a description and an error is returned',() =>{
    const newVideo = {
      title: 'test video',
      url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
    }

    it ('sends video to /videos/create path without description and video is not added but an error is returned on a form page', async () =>{
      const response = await request(app)
      .post('/videos/create')
      .type('form')
      .send(newVideo);
      assert.equal(response.status,400);
      assert.equal(parseTextFromHTML(response.text, '.description-error'), 'Path `description` is required.');
    })

  })
})
