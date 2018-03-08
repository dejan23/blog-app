const User = require('../models/User');

exports.getAll = function(req, res, next) {
  User.find({}, function(err, allUsers) {
    if (err) {return next(err)}
    return res.status(200).send(allUsers);
  })
}

exports.getByUsername = function(req, res, next) {
  const username = req.params.id
  User.findOne({username}, function(err, user) {
    if(err) {return next(err)}

    return res.status(200).send(user)
  })
}
