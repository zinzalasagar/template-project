const passport = require('passport');

const googlestream = require('passport-google-oauth').OAuth2Strategy;

const admin = require('../models/Admin');

passport.use(new googlestream({
    clientID : "433157288199-pa7dbhutt3tgi45ltdqf8hea9062plfv.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL: "http://localhost:8001/admin/auth/users/callback"

},function(accessToken,refreshToken,profile,done){
    admin.findOne({email:profile.emails[0].value}).exec(function(err,users){
        if(err){
            console.log("record not found");
            return;
        }
        console.log(users);
        if(users){
            return done(null,users);
        }
        else{
            admin.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password :"123"
            },function(err,users){
                if(err){
                    console.log("Error creating profile");
                }
                return done(null,users);
            })
        }

    })

}))

module.exports = passport;