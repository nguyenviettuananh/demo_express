var User = require('../models/userModel');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        //req.session.passport.user
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user){
            done(null,user)
        }).catch(function(err){
        });
    });

    passport.use(new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password'
        }, function (email,password,done) {
            User.findOne({
                email : email
            }).then(function(user){
                if(user && user.password == password){
                    return done(null,user)
                }
                if(user && user.password != password){
                    return done(null,false,{ message: 'Incorrect password' })
                }
                if(!user){
                    return done(null,false,{message : "Incorrect email"})
                }
            }).catch(function (err) {
                return done(err);
            });
        }
    ));
}
