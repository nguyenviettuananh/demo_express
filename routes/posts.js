var postController = require('../controllers/postController');

module.exports = function(app){

    app.get('/posts',postController.index);
    app.get('/posts/new', postController.new);
    app.post('/posts/new',[postController.createNewPost, postController.view]);
    app.get('/posts/:id',postController.view);
    app.post('/posts/:id', [postController.update,postController.view]);
};
