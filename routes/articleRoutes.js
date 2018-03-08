const Article = require('../controllers/article');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {

  app.get('/article/', Article.getAll)
  app.get('/article/:id', Article.getById)
  app.post('/article/create', requireAuth, Article.create)
  app.put('/article/:id', requireAuth, Article.update)
  app.delete('/article/:id', requireAuth, Article.delete)
}
