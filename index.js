const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

mongoose.Promise = global.Promise;
// DB setup
mongoose.connect(process.env.MONGO_URI, function(err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to mongoDB server.');
  }
});

mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', error => {
    console.warn('Warning', error);
  });

// App setup
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Routes
require('./routes/authRoutes')(app);
require('./routes/articlesRoutes')(app);
require('./routes/usersRoutes')(app);

// // Catch 404 errors and forward them to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found')
//   err.status = 404;
//   next(err);
// })
//
// // Error handler function
// app.use((err, req, res, next) => {
//   const error = process.env.NODE_ENV === 'production' ? {} : err;
//   const status = err.status || 500;
//
//   // Respond to client
// res.status(status).json({
//   error: {
//     message: error.message
//   }
// })
//
//   // Respond to ourselves
//   console.error(err);
// })
if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets, like main.js or main.css
  app.use(express.static(path.join(__dirname, 'client', 'public')));

  // express will serve up index.html file if it doesnt recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  });
}

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} locally`);
});
