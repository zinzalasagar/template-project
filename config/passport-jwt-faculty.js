const passport = require('passport');

const jwtfaculty = require('passport-jwt').Strategy;

const jwtExtract = require('passport-jwt').ExtractJwt;

const faculty = require('../models/faculty');

var opt ={
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'node'
}

passport.use(new jwtfaculty(opt, function(jwtPayLoad,done){
    faculty.findById(jwtPayLoad._id, function(err,users){
      
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