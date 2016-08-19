var Post = require("../models/postModel");
var slug = require('slug');

var postController = {
    index : function(req,res){
        Post.find().exec().then(function(posts){
            res.render('posts/index',{
                posts : posts
            })
        });

    },
    new : function(req, res) {
        res.render('posts/new')
    },
    createNewPost : function(req,res,next){
        var post = new Post(req.body.field);
        post.alias = slug(req.body.field.title,{lowercase : true});
        post.save().then(function(post){
            res.redirect('/posts')
        }).catch(function (err) {
            res.locals.data = req.body;
            res.redirect('/posts/new')
        })
    },
    view : function (req, res) {
       Post.findOne({
           _id : req.params.id
       }).then(function(post){
           res.render('posts/new',{
               data : post
           })
       }).catch(function(err){
           req.flash('error','Error : ' + err);
           res.redirect('/posts')
       })
    },
    update : function (req, res) {
        req.body.field.alias = slug(req.body.field.title,{lowercase : true});
        Post.findOneAndUpdate({
            _id : req.params.id
        },{
            $set : req.body.field
        },{
            new : true
        }).then(function(post){
            req.flash('success','Success');
            res.redirect('/posts/'+post.id);
        }).catch(function (err) {
            req.flash('error','Error : ' + err);
            res.redirect('/posts/'+req.params.id)
        })

    }
};


module.exports = postController;