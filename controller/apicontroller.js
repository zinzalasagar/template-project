const { model } = require('mongoose');
const register = require('../models/api');

const jsonwebData = require('jsonwebtoken');

module.exports.addapidata   = async function (req,res){

    // console.log(req.body);

   try { 
        if(req.body.password == req.body.cpass){
            var userData = await register.findOne({email : req.body.email});
            if(userData){
                return res.json({'msg': 'Email is already registerd','status':200})
            }
            else{
                var record =await register.create(req.body);
                if(!record){
                    console.log("record not inserted");
                    return false;
                }   
                return res.json({'msg':"Register Successfully",'status':200});
            }
        }   
        else{
            return res.json({'msg' : "Password & cpass not match",'status' : 504});
        }

   }
   catch(err){
        return res.json({'msg':"something wrong"});
    }   
}



module.exports.getData =async function(req,res){
    var alldata = await register.find({});
    if(alldata){
        return res.json({'allData' : alldata,'msg' : 'record found'});
    }
    else{
        return res.json({'msg':"something wrong"});
    }
}


module.exports.deleteData = function(req, res){

    // console.log(req.params.id);
    register.findByIdAndDelete(req.params.id, function(err, data){
        
        if(err){
            return res.json({'msg': "record not deleteData"});
        }
        return res.json({'msg': "record deleted Successfully"});

    })
}

module.exports.upDate = function(req, res){

    // console.log(req.body.id);
    var id = req.body.id;
    register.findByIdAndUpdate(id,req.body,function(err, result){
        if(err){
            return res.json({'msg': "record not upDate"});
        }
        return res.json({'msg': "record updated Successfully"});
    })

}

module.exports.tokenGenerate = function(req, res) {

    // console.log(req.body.password);

    register.findOne({email: req.body.email},function(err, users){

        if(err){
            return res.json({'msg': "invalid email"});
        }
        if(!users || users.password != req.body.password){
                return res.json({'msg': "invalid password"});
            return res.json({'msg': "invalid password"});
        }

        var token   = jsonwebData.sign(users.toJSON(),'node',{expiresIn: 10000});
        
        return res.json({'token': token});
    })
}

module.exports.deleteRecord = function(req,res){

    // console.log(req.params.id);

    register.findByIdAndDelete(req.params.id, function(err,record){

        if(err){
            return res.json({'msg': "   record not deleted"});
        }
        if(record){
             return res.json({'msg': " record deleted"});
        }
        else{
            return res.json({'msg': " somthing is wrong"});
        }
    })
}
module.exports.dataupdate = function(req, res){

    // console.log(req.params.id);
    // console.log(req.body);

    register.findByIdAndUpdate(req.params.id,req.body, function(err, data){
        if(err){
             return res.json({'msg': "   record not updated"});
        }
        if(data){
            return res.json({'msg': "   record updated"});
        }    
        else{
            return res.json({'msg': "   somthing is wrong"}); 
        }
    })
}

module.exports.patchupdatedata = function(req, res){
    
    // console.log(req.params.id);
    // console.log(req.body);
    register.findByIdAndUpdate(req.params.id, req.body, function(err,data){
        if(err){
             return res.json({'msg': "   record not updated"});

        }
        if(data){
            return res.json({'msg': "   record updated"});
        }
        else{
            return res.json({'msg': "   somthing is wrong"});

        }

    })
}
