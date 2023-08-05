const  mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const AVATAR_PATH = path.join('/uploads/slider');

const sliderSchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    }

});
let storage = multer.diskStorage({

    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
});

sliderSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
sliderSchema.statics.avatarPath = AVATAR_PATH;

const slider =mongoose.model('slider',sliderSchema);

module.exports = slider;
