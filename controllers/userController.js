var User = require("../models/userModel");
var slug = require('slug');
var bcrypt = require('bcrypt');
var userController = {
    getRegister : function(req,res){
       res.render('register')
    },
    postRegister : function (req, res,next) {
        User.find({
            email : req.body.field.email
        }).then(function(result){
            if(result.length > 0){
                req.flash('error','Your email is exists!!!');
                res.render('register',{
                    data : req.body.field
                })
            } else {
                var user = new User(req.body.field);
                return user.save().then(function(){
                    req.flash('success','Register successfully');
                    res.redirect('/posts')
                })
            }
        }).catch(function (err) {
            req.flash("error","Error : " + err );
            res.render('register',{
                data : req.body.field
            })
        })
    },

    getLogin : function (req, res) {
        res.render('login')
    },

    postLogin : function (req, res) {
        res.json(req.body)
    }
}


module.exports = userController;
