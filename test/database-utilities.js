const {mongoose, databaseUrl, options} = require('../database');
//const Video = require('../models/video');

const connectDatabaseAndDropData = async () => {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
};



const disconnectDatabase = async () => {
  await mongoose.disconnect();
};

const Video = require('../models/video');

module.exports = {
  connectDatabaseAndDropData,
  disconnectDatabase,
  Video,
};
