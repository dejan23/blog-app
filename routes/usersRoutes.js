const User = require('../controllers/user');
const { validateParam, schemas } = require('../helpers/routeHelpers');

module.exports = function(app) {
  app.get('/users', User.getAll)

  app.get('/users/:username', validateParam(schemas.idSchema, 'username'), User.getByUsername)
  app.patch('/users/:username', User.editUser)

  app.get('/users/:username/articles', User.getUserArticles)
  app.post('/users/:username/articles', User.newUserArticle)
}
