var userController = require('../controllers/userController');
//var passport = require('../config/passport');

module.exports = function(app,passport){
    app.get('/login',userController.getLogin);
    app.post('/login',passport.authenticate('local', { successRedirect: '/posts',
        failureRedirect: '/login' }));
    app.get('/register',userController.getRegister);
    app.post('/register',userController.postRegister);
};