const mongoose = require('mongoose');

const RegisterSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const register = mongoose.model('register',RegisterSchema);
module.exports = register;