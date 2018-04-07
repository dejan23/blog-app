const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
// const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/feature', requireAuth, function(req, res) {
    res.send({aSecretCode: 'super123abc', congratulation: 'You found it!', reward: 'Go get some cake, you deserved it!'})
  })

  app.post('/auth/login', Authentication.verifyLogin)
  app.post('/auth/register', Authentication.register)
  app.post('/auth/fakeregister', Authentication.fakeRegister)
  app.post('/users/:id/fakearticle', Authentication.fakeArticle)
  app.post('/auth/verify/:token', Authentication.realRegister)
  app.put('/auth/resendToken', Authentication.token, (req, res) => {

  })
}
