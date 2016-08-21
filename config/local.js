var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/userModel');
module.exports = function (passport) {
    passport.use(new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password'
        },function(username, password, done) {
            User.findOne({
                email : username
            }).then(function(user){
                if(user && user.password == password){
                    return done(null,user)
                }
                if(user && user.password != password){
                    return done(null,false,{ message: 'Incorrect username and password' })
                }
            });
        }
    ))
}