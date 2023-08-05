const category = require('../models/category');

const subcategory = require('../models/subcategory');

const fs = require('fs');

const path = require('path');
const { compile } = require('ejs');

module.exports.AddRecord = function(req, res) {
    
    return res.render('categoryRecord');
}


module.exports.insertcategoryRecord = function(req, res) {


    // console.log(req.body);
        category.create({

            category: req.body.category

            },function(err,catdata){
            if(err){
                console.log("data not found");
                return false;

            }
            return res.redirect('/category/AddRecord');
        })
            
}


module.exports.subcatedataRecord = function(req,res){
    category.find({}, function(err,catData){
        if(err){
            console.log("category record not found");
            return false;
        }

        return res.render('subcategoryrecord',{
            'catData' : catData
        });
    })
}


module.exports.AddSubcategoryData = function(req,res){
    // console.log(req.body);

    subcategory.create(req.body, function(err,subdata){
        if(err){
            console.log("subcategory record not inserted");
            return false;
        }
        return res.redirect('/category/subcatedataRecord');
    })
}


module.exports.ViewSubCategory = function(req, res)
{
    subcategory.find({}).populate('categoryId').exec(function(err,subcat){
        if(err){
            console.log("record not found");
            return false;
        }
        return res.render('subcategoryView',{
            'Subcatedata': subcat
        });
    })
}


