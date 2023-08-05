const faculty = require('../../../models/faculty');

const jsonwebData = require('jsonwebtoken');

module.exports.adddata = async function(req,res){

    // console.log(req.body);
     if(req.body.password == req.body.cpass){
        var userData = await faculty.findOne({email : req.body.email});
        if(userData){
            return res.json({'msg': "Email is already registerd"})
        }
        else{
            var record =await faculty.create(req.body);
            if(!record){
                console.log("record not inserted");
                return false;
            }   
            return res.json({'msg':"Register Successfully"});
        }
    }   
    else{
        return res.json({'msg' : "Password & cpass not match"});
    }

}

module.exports.getdata = function(req, res){

    // console.log("ok");
    faculty.aggregate([
        {
            $lookup:{
                from:"students",
                localField:"  ",
                foreignField:"  ",
                as:"students",

            }
        }
    ],function(err,data){
        if(err){
            console.log("error",err);
            return false;
        }
        return res.json({data : data});
    })
}

module.exports.deleteData = function(req, res){

    // console.log(req.params.id);

    faculty.findByIdAndDelete(req.params.id, function(err, data){

        if(err) {
            return res.json({'message': "Error deleting data"});
        }
        if(data){
            return res.json({'message': "Data deleted successfully"});
        }
        else{
            return res.json({'message': "Data not found"});
        }
    })
}

module.exports.UpDate = function(req, res){
    // console.log(req.body);

    faculty.findByIdAndUpdate(req.params.id,req.body, function(err, data){
        if(err) {
            return res.json({'message': "Error updated data"});
        }
        if(data){
            return res.json({'message': "Data updated successfully"});
        }
        else{
            return res.json({'message': "Data not found"});
        }
    })
}

module.exports.TokenGenrate = function(req, res) {

    faculty.findOne({'email': req.body.email},function(err, users){
    
        if(err){
            return res.json({'msg': "email is not match"}); 
        }
        if(!users || users.password !== req.body.password){

            return res.json({'msg': "password is not match"});
        }

        var token = jsonwebData.sign(users.toJSON(),'node',{expiresIn: 10000});
        
        return res.json({'token': token});
    })
}