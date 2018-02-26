const TempUser = require('../models/TempUser');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const cryptoRandomString = require('crypto-random-string');
var nodemailer = require('nodemailer');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({sub: user.id, iat: timestamp}, config.secretJWT);
}

exports.login = function(req, res, next) {
  // User has already ther email and password auth'd
  // We just need to give them a token
  res.send({token: tokenForUser(req.user)});
};

exports.verifyLogin = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email}, function(err, user) {
    if(err) {return next(err)}
    if(user) {
      return next()
    } else {
      TempUser.findOne({email}, function(err, user) {
        if(err) {return next(err)}
        if(!user) {
          return res.status(401).send({error: 'Username or password is incorrect'})
        } else {
          message = res.status(401).send({error: 'You must verify your email'})
          return next(message)
        }
      })
    }
  })
}

exports.register = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'});
  }

  // See if a user with the given email exists in User collection
  User.findOne({email: email}, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }

    // See if a user with the given email exists in tempUser collection
    TempUser.findOne({email: email}, function(err, existingTempUser) {
      if (err) {
        return next(err);
      }


      // If a user with email does exist, return an error
      if (existingTempUser) {
        return res.status(422).send({error: 'Email is in use'});
      }

      const token = cryptoRandomString(32);
      // If a user with email does NOT exist, create and save user record
      const user = new TempUser({
        email: email,
        password: password,
        token: token
      });

      user.save(function(err) {
        if (err) {
          return next(err);
        }

        let transporter = nodemailer.createTransport({
          service: 'Mailgun',
          auth: {
            user:
              'postmaster@sandbox66f8be4f8cee496a8dc4729939a7a063.mailgun.org',
            pass: '354f225af425b84650c0255afcebd901-fab099d8-a60e4e82'
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        let mailOptions = {
          from: 'no-reply@blog.com',
          to: email,
          subject: 'Account Verification Token',
          text: `http://localhost:8080/auth/verify/${token}`
        };
        transporter.sendMail(mailOptions, function(err) {
          if (err) {
            return res.status(500).send({error: err.message});
          }
          res.status(200).send('A verification email has been sent to ' + email + '.');
        });
      });
    });
  });
};

exports.resendToken = function(req, res, next) {
  console.log('resendToken' + req.body.email)
      const email = req.body.email;

      TempUser.findOne({email: email}, function(err, existingUser) {
        if (err) {
          return next(err);
        }

        if (!existingUser) {
          return res.status(401).send({error: 'Account/email does not exist'})
        } else {
          // console.log(existingUser.token)
          const existingToken = existingUser.token;
          let token = cryptoRandomString(32);
          // console.log(token)

          TempUser.findOneAndUpdate({token: existingToken}, {$set: {token: token}}, {new: true}, function(err, updatedUser) {
            if(err) {return next(err)}
            // console.log(updatedUser)

            let token = updatedUser.token;
            const transporter =  nodemailer.createTransport({
              service: 'Mailgun',
              auth: {
                user:
                  'postmaster@sandbox66f8be4f8cee496a8dc4729939a7a063.mailgun.org',
                pass: '354f225af425b84650c0255afcebd901-fab099d8-a60e4e82'
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            const mailOptions = {
              from: 'no-reply@blog.com',
              to: email,
              subject: 'Account Verification Token',
              text: `http://localhost:8080/auth/verify/${token}`
            };

             transporter.sendMail(mailOptions, function(err) {
              if (err) {
                return res.status(500).send({error: err.message});
              }
              res.status(200).send({success: 'Email sent!'});
            });
          })
        }
      })
  };


exports.realRegister = function(req, res, next) {
  console.log('realRegister' + req.params.token)
  const token = req.params.token;
  TempUser.findOne({token: token}, function(err, existingToken) {
    if (err) {
      return next(err);
    }
    if(!existingToken) {
      return next(err)
    }
    const user = new User({
      email: existingToken.email,
      password: existingToken.password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
    })

    TempUser.findOneAndRemove({email: existingToken.email}, function(err) {
      if (err) {
        return next(err);
      }
    })
    if (existingToken) {
      console.log('realRegister-existingToken' + existingToken)
    }
  })
}
