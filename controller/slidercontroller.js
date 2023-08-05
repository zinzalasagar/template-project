const slider = require('../models/sliderAdmin');

const fs = require('fs');

const path = require('path');

module.exports.AddRecord = function(req,res){
    return res.render('sliderData');
}

module.exports.ViewRecord = function(req, res){ 
    return res.render('sliderview_record');
}

module.exports.insertsliderRecord = function(req, res){

    slider.uploadedAvatar(req, res,function(err){
        if (err) {
            console.log("image upload error");
            return false
        }
        if (req.file){
            var avatar = slider.avatarPath+"/"+req.file.filename;
            slider.create({
                title : req.body.title,
                message : req.body.message,
                avatar : avatar
            },function(err,record){
                if (err) {
                    console.log("record error");
                    return false;
                }
                return res.redirect('back');
            })
        }
    })
}

module.exports.ViewRecord = function(req,res){
    slider.find({},function(err,record){
        return res.render('sliderview_record',{
            sliderRecord : record
        });
    })
}

module.exports.deletesliderRecord = function(req,res){
    var id  = req.params.id;

    slider.findById(id,function(err,data){
        if(err){
            console.log("not deeleted data");
            return false;
        }

        fs.unlinkSync(path.join(__dirname,'..',data.avatar));
        slider.findByIdAndDelete(id,function(err,deleteRecorde){
            if(err){
                console.log("record not deleted");
                return false;
            }
            return res.redirect('back');
        })
    })
    
}


module.exports.updatesliderRecord = function(req, res) {

   
        slider.findById(req.params.id, function(err,record){
            if(err){
                console.log("not upadated record");
                return false;
            }
            return res.render('sliderupdate',{
                'singleRecord' : record 
            })
                
        })
}

module.exports.editsliderRecord = function(req,res){

    slider.uploadedAvatar(req,res,function(err){
        if(err){
            console.log("images is not uploaded");
            return false;
        }
        if(req.file){

            slider.findById(req.body.admin_id,function(err,data){
                if(err){ 
                    console.log("error"); 
                    return false; 
                }
                // fs.unlinkSync(path.join(__dirname,'..',data.avatar));

                var avatar = slider.avatarPath+"/"+req.file.filename;
                slider.findByIdAndUpdate(req.body.admin_id,{
                    title: req.body.title,
                    message : req.body.message,
                    avatar : avatar
                },function(err,record){
                    if(err){
                        console.log("record not update");
                         return false;
                    }
                    return res.redirect('/slider/ViewRecord');
                }) 
            });
        }
        else{
            slider.findById(req.body.admin_id, function(err,data){
                var avatar = data.avatar;
                slider.findByIdAndUpdate(req.body.admin_id,{
                    title: req.body.title,
                    message : req.body.message,
                    avatar : avatar
                },function(err,record){
                    if(err){
                        console.log("record not upated");
                        return false;
                    }
                    return res.redirect('/slider/ViewRecord');
                })
            })
        }
    })
}