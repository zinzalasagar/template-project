const   mongoose  = require('mongoose');


const categoryschemas = mongoose.Schema({

    category : {

        type  : String,
        required : true
    }
      
});

const category = mongoose.model('category',categoryschemas);

module.exports = category;