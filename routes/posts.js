var postController = require('../controllers/postController');

module.exports = function(app){
    app.get('/posts',isLoggedIn,postController.index);
    app.get('/posts/new', postController.new);
    app.post('/posts/new',[postController.createNewPost, postController.view]);
    app.get('/posts/:id',postController.view);
    app.post('/posts/:id', [postController.update,postController.view]);
};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    return res.redirect('/');
}
