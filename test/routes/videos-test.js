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

  describe('returns a filled out form when called with a valid id',() =>{
    it ('calls an edit page and gets a filled out form', async () =>{
      const newVideoToAdd = {
        title: 'test video',
        description: 'video description',
        url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
      }
      const newVideo = new Video(newVideoToAdd);
      const newVid = await newVideo.save(function(err,video) {
        return video.id;
      });

      let url = '/videos/' + newVid.id + '/edit';
      const response = await request(app)
      .get(url)
      .redirects(1); //allows handling of redirect
      let title = jsdom(response.text).querySelector('#title-input');
      assert.equal(title.value, newVideoToAdd.title);
      let description = jsdom(response.text).querySelector('#description-input');
      assert.equal(description.value, newVideoToAdd.description);
      let inputUrl = jsdom(response.text).querySelector('#url-input');
      assert.equal(inputUrl.value, newVideoToAdd.url);
      let id = jsdom(response.text).querySelector('#id');
      assert.equal(id.value, newVid.id);
    })
  })
  describe('updates edit form',() =>{
    it ('calls update and the video is updated in the database', async () =>{
      const newVideoToAdd = {
        title: 'test video',
        description: 'video description',
        url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
      }
      const newVideo = new Video(newVideoToAdd);
      const newVid = await newVideo.save(function(err,video) {
        return video.id;
      });
      const newVideoUpdated = {
        title : 'Newly updated video',
        description: newVideo.description,
        url: newVideo.url
      }
      //const updatedVideo = new Video(newVideoUpdated);
      let url = '/videos/' + newVid.id + '/updates/';
      const response = await request(app)
      .post(url)
      .type('form')
      .send(newVideoUpdated);
      assert.equal(response.status,302);
      let showUrl = '/videos/show/' + newVid.id;
      assert.equal(response.headers.location,showUrl)
    })
  })

  describe('updates edit form with bad data',() =>{
    it ('calls update and an 400 status is returned', async () =>{
      const newVideoToAdd = {
        title: 'test video',
        description: 'video description',
        url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
      }
      const newVideo = new Video(newVideoToAdd);
      const newVid = await newVideo.save(function(err,video) {
        return video.id;
      });
      const newVideoUpdated = {
        description: newVideo.description,
        url: newVideo.url
      }
      //const updatedVideo = new Video(newVideoUpdated);
      let url = '/videos/' + newVid.id + '/updates/';
      const response = await request(app)
      .post(url)
      .type('form')
      .send(newVideoUpdated);
      assert.equal(response.status,400);
    })
  })
  describe('updates edit form with bad data',() =>{
    it ('400 status returns with edit page filled in', async () =>{
      const newVideoToAdd = {
        title: 'test video',
        description: 'video description',
        url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
      }
      const newVideo = new Video(newVideoToAdd);
      const newVid = await newVideo.save(function(err,video) {
        return video.id;
      });
      const newVideoUpdated = {
        description: newVideo.description,
        url: newVideo.url
      }
      //const updatedVideo = new Video(newVideoUpdated);
      let url = '/videos/' + newVid.id + '/updates/';
      const response = await request(app)
      .post(url)
      .type('form')
      .send(newVideoUpdated);
      assert.equal(response.status,400);
      let description = jsdom(response.text).querySelector('#description-input');
      assert.equal(description.value, newVideoUpdated.description);
      let inputUrl = jsdom(response.text).querySelector('#url-input');
      assert.equal(inputUrl.value, newVideoUpdated.url);
      let id = jsdom(response.text).querySelector('#id');
      assert.equal(id.value, newVid.id);
    })
  })
  describe('deletes a video from the database',() =>{
    it ('deletes video then redirects to landing page', async () =>{
      const newVideoToAdd = {
        title: 'test video',
        description: 'video description',
        url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
      }
      const newVideo = new Video(newVideoToAdd);
      const newVid = await newVideo.save(function(err,video) {
        return video.id;
      });
      const newVideoUpdated = {
        description: newVideo.description,
        url: newVideo.url
      }
      //const updatedVideo = new Video(newVideoUpdated);
      let url = '/videos/' + newVid.id + '/deletions/';
      const response = await request(app)
      .post(url);
      let showUrl = '/videos';
      assert.equal(response.headers.location,showUrl)
    })
  })

})
