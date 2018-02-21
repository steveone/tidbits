const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');


const {Video, connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');
const app = require('../../app');

describe('Server path: /', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

 describe('Server path: /videos/create',() =>{
   const newVideo = {
     title: 'Unit testing',
     description: 'What is Unit Testing',
     url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
   }

   it ('sends video to /videos/create path and video is added to the database', async () =>{
     const response = await request(app)
     .post('/videos/create')
     .type('form')
     .send(newVideo);
     const addedVideo = await Video.findOne(newVideo);
     assert.isOk(addedVideo, 'Video was not added to the database');
   })

 })

 describe('Server path: /videos/create',() =>{
   const newVideo = {
     title: '',
     description: 'What is Unit Testing',
     url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
   }

   it ('sends video to /videos/create path without title and video is not added to the database', async () =>{
     const response = await request(app)
     .post('/videos/create')
     .type('form')
     .send(newVideo);
//     const response2 = await request(app)
//     .get('/videos')
//     .redirects(1); //allows handling of redirect
     assert.equal(response.status,400);
   })
 })


});
