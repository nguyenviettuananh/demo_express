var indexController = require('../controllers/homeController');

module.exports = function(app){
    app.get('/',indexController.index)
};
