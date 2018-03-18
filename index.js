const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const path = require('path');
const cors = require('cors');

// DB setup
mongoose.connect(keys.mongoURI, function(err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
});

mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', error => {
    console.warn('Warning', error);
  });

// App setup
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
require('./routes/authRoutes')(app);
require('./routes/articleRoutes')(app);
require('./routes/userRoutes')(app);

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
