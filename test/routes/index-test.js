const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const Video = require('../../models/video');

const {connectDatabaseAndAddData, disconnectDatabase} = require('../database-utilities');
const app = require('../../app');

describe('Server path: /', () => {

  beforeEach(connectDatabaseAndAddData);

  afterEach(disconnectDatabase);

 describe('Server path: / renders videos',() =>{

   it ('returns videos from database on / route', async () =>{
     const response = await request(app)
     .get('/');

   })

 })

});
