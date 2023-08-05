const student = require('../../../models/student');

const jsonwebData = require('jsonwebtoken');

module.exports.Adddata = function (req,res){

    student.create(req.body,function(err, data){
            if(err){
                return res.json({'msg':"error creating student"});   
            }
            if(data)
            {
                return res.json({'msg':"student record creating"});
            }
            else{
                return res.json({'msg':"error creating student record"});
            } 
    })

}


module.exports.Viewdata = function(req, res){
    student.find({},function(err, student){
        if(err){
            return res.json({'msg':"data not view"});
        }
        if(student){
            return res.json({'student':student,'msg':"data view successfully"});
        }
        else{
            return res.json({'msg':"somthing is wrong"});
        }
    })

}

module.exports.DeleteRecord = function(req, res) {
     
    student.findByIdAndDelete(req.params.id,function(err,data){

        if(err){
         return res.json({'msg': "  data is not a delete"});
        }
        if(data){
            return res.json({'msg': " data is delete successfully"});
        }
        else{
            return res.json({'msg': " somthing is wrong "});
        }
    });

}

module.exports.updateRecord = function(req, res) {

    // console.log(req.params);

    student.findByIdAndUpdate(req.params.id,req.body,function(err,record){

        if(err){
            return res.json({'msg': " error updating record "});
        }
        if(record){
            return res.json({'msg': " record is updated successfully "});
        }
        else{
            return res.json({'msg': " somthing is wrong "});
        }

    })
}

module.exports.TokenGenrate = function(req, res) {

    student.findOne({email: req.body.email},function(err, users){
    
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
