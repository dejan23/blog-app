const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define model
const TempUserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  token: {
    type: String,
    expires: '1d',
    select: false
  },
  username: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  location: {
    type: String
  },
  gender: {
    type: String
  },
  day: {
    type: String
  },
  month: {
    type: String
  },
  year: {
    type: String
  }
}, {timestamps: true})

// On save hook, encrypt password
// Before saving a mode, run this function
TempUserSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

TempUserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) {return callback(err)}

    callback(null, isMatch);
  })
}

// Create the model class
const TempUserClass = mongoose.model('TempUser', TempUserSchema);

// Export the UsersModelClass
module.exports = TempUserClass;
