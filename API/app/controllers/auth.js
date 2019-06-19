var jwt = require('jsonwebtoken');
var Restaurant = require('../models/restaurant');
var Order = require("../models/order");
var orderEnum = require("../enums/orderStatus").orderStatus;
var authConfig = require('../../config/auth');
var Menu = require('../models/menu');

function generateToken(Restaurant) {
    return jwt.sign(Restaurant, authConfig.secret, {
        expiresIn: 10080
    });
}

async function setInfo(request) {
    var order = await Order.find({restaurantId:request.restaurantId});
    var active = order.filter(
        function(e){
            if(e.statusId == orderEnum.ACCEPTED){
                return e;
            }
        }
    )

    var past = order.filter(
        function(e){
            if(e.statusId == orderEnum.PICKED_UP){

                return e;
            }
        }
    )
    return {
        _id: request._id,
        restaurantId: request.restaurantId,
        email: request.email,
        latitude: request.latitude,
        longitude: request.longitude,
        activeOrders: active.length,
        pastOrders: past.length
    };
}

exports.login = async function (req, res, next) {
    var RestaurantInfo = await setInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(RestaurantInfo),
        Restaurant: RestaurantInfo
    });

}

exports.register = async function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var city = req.body.city;
    var imageUrl = req.body.imageUrl;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var opensAt = req.body.opensAt;
    var closesAt = req.body.closesAt;
    var restaurantId = req.body.restaurantId;

    // var notifToken = req.body.notifToken;
    if (!email) {
        return res.status(422).send({
            error: 'You must enter an email address'
        });
    }

    if (!password) {
        return res.status(422).send({
            error: 'You must enter a password'
        });
    }

    Restaurant.findOne({
        email: email
    }, function (err, existingRestaurant) {

        if (err) {
            return next(err);
        }

        if (existingRestaurant) {
            return res.status(422).send({
                error: 'That email address is already in use'
            });
        }

        Restaurant.findOne({
            restaurantId: restaurantId
        }, function (err, exists) {
            if (err) {
                return next(err);

            }

            if (exists) {
                return res.status(422).send({
                    error: "Restaurant ID already exists"
                })
            }

            var restaurant = new Restaurant({
                email: email,
                password: password,
                name: name,
                city: city,
                restaurantId: restaurantId,
                imageUrl: imageUrl,
                latitude: latitude,
                longitude: longitude,
                imageUrl: imageUrl,
                opensAt: opensAt,
                closesAt: closesAt
                // notifToken:notifToken
            });
            restaurant.save(async function (err, rest) {

                if (err) {
                    return next(err);
                }

                var RestaurantInfo = await setInfo(rest);

                var menu = new Menu({
                    restaurantId: rest.restaurantId
                })

                menu.save(function (err, saved) {
                    res.status(201).json({
                        token: 'JWT ' + generateToken(RestaurantInfo),
                        Restaurant: RestaurantInfo
                    })
                })
            });

        })

    });
}