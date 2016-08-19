var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
mongoose.Promise = require('bluebird');

module.exports = mongoose;