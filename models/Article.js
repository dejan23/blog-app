const mongoose = require('mongoose');

// Define model
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true})

// Create the model class
const ArticleClass = mongoose.model('Article', articleSchema);

// Export the UsersModelClass
module.exports = ArticleClass;
