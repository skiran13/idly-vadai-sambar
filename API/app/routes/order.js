var authController = require('../controllers/auth'),
    express = require('express'),
    passportService = require('../../config/auth');
passport = require('passport');

var requireAuth = passport.authenticate('jwt', {
    session: false
});
var requireLogin = passport.authenticate('local', {
    session: false
});


var orderCtrl = require('../controllers/order');

module.exports = (app) => {

    app.put("/:restId/order/place", orderCtrl.placeOrder);
    app.put("/order/cancel", orderCtrl.cancelOrder);
    app.put("/order/accept", orderCtrl.acceptOrder);
    app.put("/order/reject", orderCtrl.rejectOrder)
    app.put("/order/status/change", orderCtrl.changeOrderStatus);
    app.get("/:restaurantId/orders/active", orderCtrl.getActiveOrders);
    app.get("/:restaurantId/orders/past", orderCtrl.getPastOrders);
    app.get("/:restaurantId/orders/pending", orderCtrl.getPendingOrders);
    app.get("/:restaurantId/orders/all", orderCtrl.getAllOrders);
    app.get("/:restaurantId/orders/stats",orderCtrl.getStats);
}