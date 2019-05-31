const mongoose = require('mongoose');
const config = require('config');

const mongoDbUri = config.get('mongoDbUri');

const connectDb = async () => {
  try {
    await mongoose.connect(mongoDbUri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log('Connected to database');
  } catch (err) {
    console.log(err.message);

    process.exitCode = 1;
  };
};

module.exports = connectDb;
