const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const Video = require('../../models/video');
const { connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');



describe('very that the video title and description requires a string',() =>{

    beforeEach(connectDatabaseAndDropData);

    afterEach(disconnectDatabase);

  describe('testing the video title as an integer becomes a string',()=>{
    it('Tries to submit a video that with an integer for a title updates to a string',()=>{
        const newVideo = new Video({
          title: 5,
          description: 'testing',
          url: 'https://www.youtube.com'
        });
        assert.strictEqual('5',newVideo.title);
    })
  })

  describe('testing the video description as an integer becomes a string',()=>{
    it('Tries to submit a video that with a integer for a description updates to a string',()=>{
        const newVideo = new Video({
          title: 'new title',
          description: '5',
          url: 'https://www.youtube.com'
        });
        assert.strictEqual('5',newVideo.description);
    })
  })


});
