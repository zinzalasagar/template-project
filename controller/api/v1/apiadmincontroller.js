
const Adminpenal = require('../../../models/adminpenal');

const student  = require('../../../models/student'); 

const faculty = require('../../../models/faculty');

const jsonWebData = require('jsonwebtoken');

    
module.exports.adddata = async function(req,res){

    // console.log(req.body);

        if(req.body.password == req.body.cpass){
            var userData = await Adminpenal.findOne({email : req.body.email});
            if(userData){
                return res.json({'msg': "Email is already registerd"})
            }
            else{
                    var record =await Adminpenal.create(req.body);
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

module.exports.getdata  = async function(req,res){

    var data = await Adminpenal.find({});
    var record = await student.find({});
    var sagar = await faculty.find({});   
    {
        if(data){
            return res.json({'data' : data,'record': record,'sagar':sagar,'msg' : "data found"});
        }
        else{
            return res.json({'msg' : "data not found"});

        }
    }
}

module.exports.deletedata = function(req, res){

    // console.log(req.params.id);

    // console.log("hello");

    Adminpenal.findByIdAndDelete(req.params.id,function(err,data){

            if(err){
                 return res.json({'msg' : "not deletedata " });
            }
            if(data){
                return res.json({'msg' :"deletedata successfully" });
            }
            else{
                return res.json({'msg' : "not deletedata " });

            }
    })
}

module.exports.updatedata = function(req,res){

    // console.log(req.body.id);

    Adminpenal.findByIdAndUpdate(req.params.id,req.body,function(err,data){
        if(err){
            return res.json({'msg' : " not  updatedata " });
       }
       if(data){
           return res.json({'msg' :"updatedata successfully" });
       }
       else{
           return res.json({'msg' : "not updatedated" });

       }
    })
} 

module.exports.tokenGenerate = function(req, res) {

    Adminpenal.findOne({'email' : req.body.email}, function(err, users){
        if(err){
            return res.json({'msg' : "email not matched" });
        }
        if(!users || users.password !== req.body.password){

            return res.json({'msg' : "password not matched" });
        }

        var token = jsonWebData.sign(users.toJSON(),'node',{expiresIn : 10000});
        
        return res.json({'tokan' : token });
    })
}