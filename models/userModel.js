var mongoose = require('./database');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : String,
    password : String,
    display_name : String
});

var User = mongoose.model("User",userSchema);

module.exports = User;