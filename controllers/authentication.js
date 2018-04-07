const TempUser = require('../models/TempUser');
const User = require('../models/User');
const Article = require('../models/Article');
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
const nodemailer = require('nodemailer');
const faker = require('faker');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({sub: user.id, iat: timestamp}, process.env.SECRET_JWT);
}

exports.verifyLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const tempUser = await TempUser.findOne({email}).select("+password");
    if (tempUser) {
      return res.status(401).send({error: 'You must verify your email'});
    }

    const user = await User.findOne({email}).select("+password");
    if (!user) {
      return res.status(401).send({error: 'Wrong pass or email'});
    }
    if (user) {
      // compare passwords - is 'password' equal to user.password?
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return res.send({
            token: tokenForUser(user),
            username: user.username
          });
        }
        return res.status(401).send({error: 'Wrong pass or email'});
      });
    }
  } catch(err) {
    next(err)
  }
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
            user: process.env.MAILGUN_LOGIN,
            pass: process.env.MAILGUN_PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        let mailOptions = {
          from: 'no-reply@blog-app',
          to: email,
          subject: 'Account Verification Token',
          text: `Here is your verification token: ${process.env.SITE_URL}/auth/verify/${token}`
        };
        transporter.sendMail(mailOptions, function(err) {
          if (err) {
            return res.status(500).send({error: err.message});
          }
          res
            .status(200)
            .send('A verification email has been sent to ' + email + '.');
        });
      });
    }).select("+password");
  }).select("+password");
};

exports.token = async (req, res, next) => {
  try {
    const email = req.body.email;
    const tempUser = await TempUser.findOne({email}).select("+token")
    if (!tempUser) {
      return res.status(401).send({error: 'Account/email does not exist'});
    }

    const oldToken = tempUser.token;
    let newToken = cryptoRandomString(32);

    const tempUserWithNewToken = await TempUser.findOneAndUpdate(
        {token: oldToken},
        {$set: {token: newToken}},
        {new: true}
      ).select("+token")

    const tokenForMailing = tempUserWithNewToken.token;

    const transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: process.env.MAILGUN_LOGIN,
        pass: process.env.MAILGUN_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `no-reply@blog-app`,
      to: email,
      subject: 'Account Verification Token',
      text: `Here is your verification token: ${process.env.SITE_URL}/auth/verify/${tokenForMailing}`
    };

    transporter.sendMail(mailOptions, function(err) {
      if (err) {
        return res.status(500).send({error: err.message});
      }
      res.status(200).send({success: 'Email sent!', tempUserWithNewToken});
    });
  } catch(err) {
    next(err)
  }
}



exports.realRegister = async (req, res, next) => {
  try {
    const {token} = req.params
    const tempUser = await TempUser.findOne({token}).select("+password +token");
    if(!tempUser) { return res.status(401).send({error: 'Invalid token'})};
    const user = new User({
       email: tempUser.email,
       password: tempUser.password,
       username: tempUser.username,
       firstName: tempUser.firstName,
       lastName: tempUser.lastName,
       location: tempUser.location,
       gender: tempUser.gender,
       day: tempUser.day,
       month: tempUser.month,
       year: tempUser.year
     });
    user.save();
    await TempUser.findOneAndRemove({email: tempUser.email});
    res.status(200).json('User successfully verifed');
  } catch(err) {
    next(err)
  }
};







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
  });
};

exports.fakeArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('id', id)

    // 1. find the actiual author
    const author = await User.findById({_id: id});

    // 2. create a new article
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const newArticle = {
      title: `opel ${getRandomInt(53)}`,
      description: faker.lorem.lines(),
      price: faker.random.number(),
    }
    delete newArticle.author;

    const article = new Article(newArticle);
    article.author = author;
    await article.save()

    // 3. add newsly created article to the actiual author
    author.articles.push(article);
    await author.save();

    res.status(200).json(article)
  } catch(err) {
    next(err)
  }
}
