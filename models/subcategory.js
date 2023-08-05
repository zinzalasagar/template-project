const mongoose = require('mongoose');


const subcategoryschema = mongoose.Schema({

    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategoryName :{
        type: String,
        required : true,
    },
   

});

const subcategory =mongoose.model('subcategory',subcategoryschema);

module.exports = subcategory;
