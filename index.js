const express = require('express');

const cookieparser = require('cookie-parser');

const port = 8001;

const app = express();

const path = require("path");

const admin = require('express-ejs-layouts');

const db = require('./config/mongoose');   

const session = require('express-session');

const passport = require('passport');

const passport_local = require('./config/passport-local-stretagy');

const googlestream = require('./config/passport-google');

const jwtstrategy = require('./config/passport-jwt-strategy');

const jwtfaculty = require('./config/passport-jwt-faculty');    

const jwtstudents = require('./config/passport-jwt-students');

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.set("layout login", false);
app.set("layout lostpassword", false);

app.use(express.static('assets'));

app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(admin);

app.use(cookieparser());

app.use(express.urlencoded());

app.use(session({
    name : "sagar",
    secret : "zinzala",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    }
}))

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

  

app.listen(port, function(err){
    if(err){
        console.log("server is not working");
        return false;
    }
    console.log("Server is running on port:",port);
});