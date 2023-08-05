const passport = require('passport');

const jwtstrategy = require('passport-jwt').Strategy;

const jwtExtract = require('passport-jwt').ExtractJwt;

const Adminpenal   = require('../models/adminpenal');

var opt ={
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'node'
}

passport.use(new jwtstrategy(opt, function(jwtPayload,done){
    Adminpenal.findById(jwtPayload._id, function(err,users){
      
        if(err){
            console.log('jwt not found register data');
            return false;
        }
        if(users){
            return done(null,users);
        }
        else{
            return done(null,false);

        }
    })
}))

module.exports = passport;