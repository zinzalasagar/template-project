const mongoose = require('mongoose');
const faculty = require('./faculty');

const student1schema = mongoose.Schema({

    name: {
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
    course : {
         type :String,
         required: true,
    },
    duration :  {
        type : Number,
        required: true, 
    },
    fees :{
         type : Number,
         required: true,
    },
   facultyId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
    }
})  

const  student = mongoose.model('Student',student1schema);

module.exports = student;