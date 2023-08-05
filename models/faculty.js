const mongoose = require('mongoose');

const facultyschema = mongoose.Schema({

    Username: {
        type : String,
        required: true,

    },
    email :{
        type : String,
        required: true,
    },
    password :{
        type : String,
        required: true,
    },
    phoneNumber : {
         type : Number,
         required: true,
    },
    subject : {
         type :String,
         required: true,
    },
    salary :  {
        type : Number,
        required: true, 
    }
})

const  faculty = mongoose.model('faculty',facultyschema);

module.exports = faculty;