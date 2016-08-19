var mongoose = require('./database');
var Schema = mongoose.Schema;
// create a schema
var postSchema = new Schema({
    title: String,
    content: { type: String, required: true, unique: true },
    alias: { type: String, required: true },
    published: { type : Number},
    author: String,
    created_at: Date,
    updated_at: Date
});

var Post = mongoose.model("Post",postSchema);

module.exports = Post;

