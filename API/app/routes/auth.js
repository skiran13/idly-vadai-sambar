var authController = require('../controllers/auth'),
  express = require('express'),
  passportService = require('../../config/passport');
passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });
var requireLogin = passport.authenticate('local', { session: false });
module.exports = app => {
  app.post('/register', authController.register);
  app.post('/login', requireLogin, authController.login);
  app.get('/protec', requireAuth, function(req, res) {
    res.send({ content: 'SUCCESS', user: req.user });
  });
};
