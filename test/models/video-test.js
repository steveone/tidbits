const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const Video = require('../../models/video');

async function connectDatabase() {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}


describe('very that the video title requires a string',() =>{
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
});


module.exports = {
  connectDatabase,
  disconnectDatabase,
}
