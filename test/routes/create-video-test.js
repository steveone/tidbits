const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');


const {Video, connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');
const app = require('../../app');

describe('Server path: /', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

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

});
