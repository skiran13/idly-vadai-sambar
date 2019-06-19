var authController = require('../controllers/auth'),
express = require('express'),
passportService = require('../../config/auth');
passport = require('passport');

var requireAuth = passport.authenticate('jwt',{session: false});
var requireLogin = passport.authenticate('local', {session:false});

var restCtrl = require('../controllers/restaurant');

module.exports = (app) => {
    
  
}