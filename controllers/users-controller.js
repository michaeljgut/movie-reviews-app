const bcrypt = require('bcryptjs');
const User = require('../models/users.js');

const usersController = {};

usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    password_digest: hash,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/user');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

usersController.index = (req, res) => {
  User.findUserComments(req.user.id)
    .then(comments => {
        res.json({
        user: req.user,
        data: 'Put a user profile on this route',
        comments: comments,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({err: err});
    });
}

module.exports = usersController;
