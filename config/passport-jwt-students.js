const passport = require('passport');

const jwtstudents = require('passport-jwt').Strategy;

const jwtExtract = require('passport-jwt').ExtractJwt;

const student = require('../models/student');

var opt ={
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'node'
}

passport.use(new jwtstudents(opt, function(jwtPayload,done){
    student.findById(jwtPayload._id, function(err,users){
      
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