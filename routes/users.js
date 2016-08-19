var userController = require('../controllers/userController');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel');
passport.serializeUser(function(user, done) {
    //req.session.passport.user
    console.log(1);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log(2);
    User.findById(id).then(function(user){
        done(null,user)
    }).catch(function(err){
        console.log(err);
    });
});

passport.use(new LocalStrategy(
    function (email,password,done) {
        console.log('vao day ko');
        User.find({
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
))

module.exports = function(app){
    app.get('/login',userController.getLogin);
    app.post('/login',passport.authenticate('local', { failureRedirect: '/login',failureFlash: 'Invalid username and password' }),userController.postLogin);
    app.get('/register',userController.getRegister);
    app.post('/register',userController.postRegister);
};