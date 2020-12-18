const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const auth = require('./routes/pb/auth');
const budget = require('./routes/pb/budget');
const expense = require('./routes/pb/expense');
const PORT = process.env.PORT || 5000;
const connectDB = require('./DB/Connection.js');
const path = require('path');
const app = express();
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

//Connect to Database in local host

// mongoose
//   .connect('mongodb://localhost:27017/PersonalBudget', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//   })
//   .then(() => {
//     console.log('Connected to Database');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Cookie Parsor Middleware
app.use(cookieParser());

// Cors Middleware
app.use(cors());

// Route Middleware
app.use('/pb/auth', auth);
app.use('/pb/budget', budget);
app.use('/pb/expense', expense);

// Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
  //Set Static Folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Listening on Port 5000
app.listen(PORT, (req, res) => {
  console.log(`Server Running on Port: ${PORT}`);
});
