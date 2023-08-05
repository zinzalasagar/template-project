const express = require('express');

const passport = require('passport');

const routes = express.Router();

const categorycontroller = require('../controller/categorycontroller');

routes.get('/AddRecord',passport.checkAuthentication, categorycontroller.AddRecord);

routes.post('/insertcategoryRecord',passport.checkAuthentication,categorycontroller.insertcategoryRecord);

routes.get('/subcatedataRecord',passport.checkAuthentication,categorycontroller.subcatedataRecord);

routes.post('/AddSubcategoryData',passport.checkAuthentication,categorycontroller.AddSubcategoryData);

routes.get('/viewsubcategory',passport.checkAuthentication,categorycontroller.ViewSubCategory);


module.exports = routes;        