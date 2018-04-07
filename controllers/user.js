const User = require('../models/User');
const Article = require('../models/Article');

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch(err) {
    next(err);
  }
}

exports.getByUsername = async (req, res, next) => {
  // const { username } = req.params;
  try {
    const { username } = req.value.params;
    const user = await User.findOne({username});
    if(!user) {
      return res.status(404).send({error: 'User not found'});
   }
    res.status(200).send(user)
  } catch(err) {
    next(err)
  }
}

exports.editUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const updatedUser = req.body;
    const user = await User.findOneAndUpdate({username}, updatedUser, {new: true});

    if(!user) {
      return res.status(404).send({error: 'User not found'});
   }
    res.status(200).send(user)
  } catch(err) {
    next(err)
  }
}

exports.getUserArticles = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({username}).populate('articles');
    res.status(200).send(user.articles)
  } catch(err) {
    next(err)
  }
}

exports.newUserArticle = async (req, res, next) => {
  try {
    const { username } = req.params;
    // create a new article
    const newArticle = new Article(req.body);
    // get user/author
    const user = await User.findOne({username});

    // assign user as a article user
    newArticle.user = user;
    // save the article
    await newArticle.save();
    // save the article to the users articles array
    user.articles.push(newArticle);
    // save the user
    await user.save();
    res.status(201).send(newArticle)
  } catch(err) {
    next(err)
  }
}
