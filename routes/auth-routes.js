const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

// I got this idea from this web site:
// https://stackoverflow.com/questions/16536229/node-js-connect-flash-message-does-not-show-up
authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login',{
     title  : 'Login',
     errors : req.flash('error')
   });
});

authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});
authRouter.post('/register', usersController.create);

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/movie-reviews',
    failureRedirect: '/auth/login',
    successFlash: 'Welcome!',
    failureFlash: true
  })
);

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;
