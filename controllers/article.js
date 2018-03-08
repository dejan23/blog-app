const Article = require('../models/Article');

exports.getAll = function(req, res, next) {
  Article.find({}, function(err, allArticles) {
    if (err) {return next(err)}
    return res.status(200).send(allArticles);

  })
  .populate('user')
}

exports.getById = function(req, res, next) {
  Article.findById(req.params.id, function(err, article) {
    if(err) {return next(err)}
    return res.status(200).send(article)
  })
  .populate('user')
}

exports.create = function(req, res, next) {
  const user = req.user
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  if (!title || !price || !description) {
    return res.status(422).send({error: 'You must provide title and price and description'});
  }

  const article = new Article({
    description,
    title,
    price,
    user
  })

  article
    .save()
    .then(result => {
      res.status(201).json({
        message: "Article successfully added",
        article: result
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
};

exports.update = function(req, res, next) {
  const user = req.user
  const id = req.params.id
  const title = req.body.title
  const price = req.body.price
  const description = req.body.description
  const updated_at = new Date();


  Article.findOneAndUpdate({_id: id}, {$set: {title, price, description, updated_at, user}}, {new: true}, function(err, updatedArticle) {
    if(err) {return next(err)}
    if(!updatedArticle) {
      return res.status(200).send({ message: "Article by that id was not found" })
    }
    const response = {
      user: user,
      message: "Article successfully updated",
      updatedArticle
    }
    return res.status(200).send(response)
  })

}

exports.delete = function(req, res, next) {
  const id = req.params.id;

  Article.findByIdAndRemove(id, function(err, removedArticle) {
      if(err) return res.status(500).send(err);
      if(!removedArticle) {
        return res.status(200).send({ message: "Article by that id was not found" })
      }
      const response = {
        message: "Article successfully deleted",
        removedArticle
      }
      return res.status(200).send(response)
  })
}
