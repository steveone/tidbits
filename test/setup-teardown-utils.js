const {mongoose, databaseUrl, options} = require('../database');

const connectDatabaseAndDropData = async () => {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
};

const diconnectDatabase = async () => {
  await mongoose.disconnect();
};

const Video = require('../models/video');

module.exports = {
  connectDatabaseAndDropData,
  diconnectDatabase,
  Video,
};
