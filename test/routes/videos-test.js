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
    // console.log(response.text);
     assert.equal(parseTextFromHTML(response.text, '.video-title'), newVideoToAdd.title);

   })
 })

 describe('Server path: / does not render video if no title exists',() =>{

   const newVideoToAdd = {
//     title: 'Unit testing',
     description: 'What is Unit Testing',
     url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
   }
   let newVideo = new Video(newVideoToAdd);
   newVideo.add;

   it ('returns videos from database on / route', async () =>{
     const response = await request(app)
     .get('/videos')
     .redirects(1); //allows handling of redirect
     assert.equal(parseTextFromHTML(response.text, '#videos-container'), '');

   })

 })


});
