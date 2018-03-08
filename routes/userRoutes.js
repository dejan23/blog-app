const User = require('../controllers/user');

module.exports = function(app) {

  app.get('/users', User.getAll)
  app.get('/user/:id', User.getByUsername)
}
