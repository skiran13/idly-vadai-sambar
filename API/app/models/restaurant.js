var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var restaurantJSON = {
    name:String,
    city:String,
    restaurantId:{
        type:String,
        unique:true
    },
    imageUrl:String,
    latitude:Number,
    longitude:Number,
    opensAt:String,
    closesAt:String,
    email:String,
    password:String
}

var RestaurantSchema = new mongoose.Schema(restaurantJSON, {
    timestamps: true
});

RestaurantSchema.pre('save', function (next) {

    var restaurant = this;
    var SALT_FACTOR = 5;

    if (!restaurant.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {

        if (err) {
            return next(err);
        }

        bcrypt.hash(restaurant.password, salt, null, function (err, hash) {

            if (err) {
                return next(err);
            }

            restaurant.password = hash;
            next();

        });

    });

});

RestaurantSchema.methods.comparePassword = function (passwordAttempt, cb) {

    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {

        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });

}

module.exports = mongoose.model('Restaurants', RestaurantSchema);
