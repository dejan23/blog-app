const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // app.get('/', function(req, res) {
  //   res.send({message: 'super 123abc'})
  // })
  app.post('/auth/login', Authentication.verifyLogin, requireLogin, Authentication.login)
  app.post('/auth/register', Authentication.register)
  app.post('/auth/verify/:token', Authentication.realRegister)
  app.put('/auth/resendToken', Authentication.resendToken)
}
