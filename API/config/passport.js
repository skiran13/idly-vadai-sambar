var passport = require('passport');
var Restaurant = require('../app/models/restaurant');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
 
module.exports = function(passport){
    var localOptions = {
        usernameField: 'email'
    };

     
    var localLogin = new LocalStrategy(localOptions, function(email, password, done){

        Restaurant.findOne({
            email: email
        }, function(err, restaurant){
     
            if(err){
                return done(err);
            }
     
            if(!restaurant){
                return done(null, false, {error: 'Login failed. Please try again.'});
            }
     
            restaurant.comparePassword(password, function(err, isMatch){
     
                if(err){
                    return done(err);
                }
     
                if(!isMatch){
                    return done(null, false, {error: 'Login failed. Please try again.'});
                }     
                return done(null, restaurant);
     
            });
     
        });
     
    });

    var jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.secret
    };
     
    var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

        Restaurant.findById(payload._id, function(err, restaurant){
            if(err){
                return done(err, false);
            }
     
            if(restaurant){
                done(null, restaurant);
            } else {
                done(null, false);
            }
     
        });
     
    });
     
    passport.use('jwt',jwtLogin);
    passport.use('local',localLogin);
}
