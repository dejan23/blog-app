const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})



userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) {return callback(err)}

    callback(null, isMatch);
  })
}

// Create the model class
const UsersModelClass = mongoose.model('User', userSchema);

// Export the UsersModelClass
module.exports = UsersModelClass;
