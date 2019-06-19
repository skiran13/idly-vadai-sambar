var authController = require('../controllers/auth'),
express = require('express'),
passportService = require('../../config/auth');
passport = require('passport');

var requireAuth = passport.authenticate('jwt',{session: false});
var requireLogin = passport.authenticate('local', {session:false});

var menuCtrl = require('../controllers/menu');

module.exports = (app) => {
    
    app.get("/:restId/menu",menuCtrl.getMenu);
    app.put("/:restId/menu",menuCtrl.addItem);
    app.get("/:restId/item/:itemId",menuCtrl.getItem);
    app.put("/:restId/item/:itemId",menuCtrl.updateItem);
    app.delete("/:restId/item/:itemId",menuCtrl.deleteItem)
}