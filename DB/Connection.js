const mongoose = require('mongoose');

const URI =
  'mongodb+srv://darshan:darshan654@personalbudget.akfla.mongodb.net/PersonalBudget?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => {
      console.log('Connected to Mongoose Database in Cloud');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
