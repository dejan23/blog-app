const Article = require('../models/Article');
const User = require('../models/User');

exports.getAll = async (req, res, next) => {
  try {
    let sort = req.query.sort
    let sortby = null;
    if(sort === 'undefined') { sort = -1, sortby = "createdAt"}
    if(sort === undefined) { sort = -1, sortby = "createdAt"}
    if(sort === 'newest') { sort = -1, sortby = "createdAt"}
    if(sort === 'oldest') { sort = 1, sortby = "createdAt"}
    if(sort === 'price-low') { sort = 1, sortby = 'price' }
    if(sort === 'price-high') { sort = -1, sortby = 'price' }

    let sortobj = {};
    sortobj[sortby] = sort;

    const articles = await Article.find({})
    .lean()
    .populate('author', 'username')
    .sort(sortobj)
    res.status(200).send(articles);
  } catch(err) {
    next(err);
  }
};

exports.find = async (req, res, next) => {
  try {
    const title = new RegExp("^"+ req.query.title);

    let sort = req.query.sort
    if(sort === undefined) { sort = -1, sortby = "createdAt"}
    if(sort === null) { sort = -1, sortby = "createdAt"}
    if(sort === 'undefined') { sort = -1, sortby = "createdAt"}
    if(sort === 'newest') { sort = -1, sortby = "createdAt"}
    if(sort === 'oldest') { sort = 1, sortby = "createdAt"}
    if(sort === 'price-low') { sort = 1, sortby = 'price' }
    if(sort === 'price-high') { sort = -1, sortby = 'price' }
    console.log(sort)
    let sortobj = {};
    sortobj[sortby] = sort;

    const articles = await Article.find({ title })
      .lean()
      .populate('author', 'username')
      .sort(sortobj)
    if(articles.length === 0) {
      return res.status(404).send({error: 'Nothing found'});
    }
    res.status(200).send(articles);
  } catch(err) {
    next(err)
  }
}

exports.getById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id).populate('author')
    if(!article) {
      return res.status(404).send({error: 'Article is not found'});
   }
    res.status(200).json(article);
  } catch(err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    // 1. find the actiual author
    const user = req.user;
    const author = await User.findById(user._id);
    // 2. create a new article
    const newArticle = req.body
    delete newArticle.author;

    const article = new Article(newArticle);
    article.author = author;
    await article.save()

    // 3. add newsly created article to the actiual author
    author.articles.push(article);
    await author.save();

    res.status(200).json({
      article: article,
      success: "Article successfully posted"
    })
  } catch(err) {
    next(err)
  }
};

//   const user = req.user;
//   const title = req.body.title;
//   const price = req.body.price;
//   const description = req.body.description;
//
//   if (!title || !price || !description) {
//     return res
//       .status(422)
//       .send({error: 'You must provide title and price and description'});
//   }
//
//   const article = new Article({
//     description,
//     title,
//     price,
//     user
//   });
//
//   article
//     .save()
//     .then(result => {
//       res.status(201).json({
//         message: 'Article successfully added',
//         article: result
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });


exports.update = async(req, res, next) => {
  try {
    const { id } = req.params;
    const updatedArticle = req.body;
    const article = await Article.findByIdAndUpdate(id, updatedArticle, {new: true});
    if(!article) {
      return res.status(404).send({error: 'Article is not found'});
   }
    res.status(200).json({
      article: article,
      success: "Article successfully updated"
    })
  } catch(err) {
    next(err)
  }

  // const user = req.user;
  // const id = req.params.id;
  // const title = req.body.title;
  // const price = req.body.price;
  // const description = req.body.description;
  // const updated_at = new Date();
  //
  // Article.findOneAndUpdate(
  //   {_id: id},
  //   {$set: {title, price, description, updated_at, user}},
  //   {new: true},
  //   function(err, updatedArticle) {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!updatedArticle) {
  //       return res
  //         .status(200)
  //         .send({message: 'Article by that id was not found'});
  //     }
  //     const response = {
  //       user: user,
  //       message: 'Article successfully updated',
  //       updatedArticle
  //     };
  //     return res.status(200).send(response);
  //   }
  // );
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    // get the article
    const article = await Article.findById(id)
    if(!article) {
      return res.status(404).send({error: 'Article is not found'});
   }
    // get the author
    const authorId = article.author;
    const author = await User.findById(authorId);
    if(!author) {
      return res.status(404).send({error: 'Author of this article is not found'});
    }
    // remove article
    await article.remove();
    //remove article from authors articles list
    author.articles.pull(article);
    await author.save();

    res.status(200).json({ success: "Article is deleted" })
  } catch(err) {
    next(err)
  }


  // const id = req.params.id;
  //
  // Article.findByIdAndRemove(id, function(err, removedArticle) {
  //   if (err) return res.status(500).send(err);
  //   if (!removedArticle) {
  //     return res
  //       .status(200)
  //       .send({message: 'Article by that id was not found'});
  //   }
  //   const response = {
  //     message: 'Article successfully deleted',
  //     removedArticle
  //   };
  //   return res.status(200).send(response);
  // });
};
