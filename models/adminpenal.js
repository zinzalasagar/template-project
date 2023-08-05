const mongoose = require('mongoose');

const penalschema = mongoose.Schema({
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

const Adminpenal = mongoose.model('Adminpenal',penalschema);
module.exports = Adminpenal;