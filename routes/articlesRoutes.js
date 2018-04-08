const Article = require('../controllers/article');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app) {
  app.get('/articles', Article.getAll, function(req, res) {
    res.send({aSecretCode: 'super123abc'});
  });
  app.get('/search', Article.find)
  app.post('/articles', requireAuth, Article.create);

  app.get('/articles/:id', Article.getById);
  app.patch('/articles/:id',  Article.update);
  app.delete('/articles/:id',  Article.delete);
};
