const TempUser = require('../models/TempUser');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const cryptoRandomString = require('crypto-random-string');
const nodemailer = require('nodemailer');
const faker = require('faker');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({sub: user.id, iat: timestamp}, config.secretJWT);
}

exports.verifyLogin = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  TempUser.findOne({email}, function(err, user) {
    if(err) {return next(err)}
    if(user) {
      return res.status(401).send({error: 'You must verify your email'})
    }

    User.findOne({email}, function(err, user) {
      if(err) {return next(err)}
      if(!user) {
        return res.status(401).send({error: 'Wrong pass or email'})
      }
      if(user) {
        // compare passwords - is 'password' equal to user.password?
        user.comparePassword(password, function(err, isMatch){
          if(err) { return done(err) }
          if(isMatch) {
            console.log(user)
            return res.send({token: tokenForUser(user), username: user.username});
          }
          return res.status(401).send({error: 'Wrong pass or email'})
        })
      }

    })
  })


}

exports.register = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const location = req.body.location;
  const gender = req.body.gender;
  const day = req.body.day;
  const month = req.body.month;
  const year = req.body.year;

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
        email,
        password,
        token,
        username,
        firstName,
        lastName,
        location,
        gender,
        day,
        month,
        year
      });

      user.save(function(err) {
        if (err) {
          return next(err);
        }

        let transporter = nodemailer.createTransport({
          service: 'Mailgun',
          auth: {
            user:
              config.mailgunLogin,
              pass: config.mailgunPass
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        let mailOptions = {
          from: 'no-reply@blog.com',
          to: email,
          subject: 'Account Verification Token',
          text: `${config.siteURL}/auth/verify/${token}`
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
                config.mailgunLogin,
                pass: config.mailgunPass
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          const mailOptions = {
            from: 'no-reply@blog.com',
            to: email,
            subject: 'Account Verification Token',
            text: `${config.siteURL}/auth/verify/${token}`
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
      password: existingToken.password,
      username: existingToken.username,
      firstName: existingToken.firstName,
      lastName: existingToken.lastName,
      location: existingToken.location,
      gender: existingToken.gender,
      day: existingToken.day,
      month: existingToken.month,
      year: existingToken.year
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


// FAKE REGISTER USING FAKER PACKAGE

exports.fakeRegister = function(req, res, next) {

  const user = new User({
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.name.firstName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    location: faker.address.country(),
    city: faker.address.city(),
    gender: faker.name.prefix(),
    day: faker.random.number(),
    month: faker.date.month(),
    year: faker.random.number(),
    avatar: faker.internet.avatar()
  });

  user.save(function(err) {
    if (err) {
      return next(err);
    }
  return res.status(200).send({success: 'user added!'});
  })
}
