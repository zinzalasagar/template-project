const passport = require('passport');

const Admin = require('../models/Admin');

const passport_local = require('passport-local').Strategy;


passport.use(new passport_local({
    usernameField : 'email'
},function(email,password,done){
    Admin.findOne({email : email},function(err,user){
        if(err){
            console.log("email id not match")
            return done(null,false);
        }
        if(user.password != password || !user){
            console.log("password is not match");
            return done(null,false);
        }
        console.log(user);
        return done(null,user);
    })

}))


passport.serializeUser(function(user,done){
    return done(null,user.id);

})

passport.deserializeUser(function(id,done){
    Admin.findById(id,function(err,user){
        if(err){
            console.log("not found record");
            return done(null,false);
        }
        return done(null,user);
    })
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/admin/');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    return next();
}

module.exports = passport;
