const {mongoose, databaseUrl, options} = require('../database');
//const Video = require('../models/video');

const connectDatabaseAndDropData = async () => {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
};

const connectDatabaseAndAddData = async () => {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
  const newVideoToAdd = {
    title: 'Unit testing',
    description: 'What is Unit Testing',
    url: 'https://www.youtube.com/watch?v=lj5nnGa_DIw'
  }
  let newVideo = new Video(newVideoToAdd);
  newVideo.add;
};

const disconnectDatabase = async () => {
  await mongoose.disconnect();
};

const Video = require('../models/video');

module.exports = {
  connectDatabaseAndDropData,
  connectDatabaseAndAddData,
  disconnectDatabase,
  Video,
};
