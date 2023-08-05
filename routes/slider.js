
const express = require('express');

const passport = require('passport');

const routes = express.Router();

const slidercontroller = require('../controller/slidercontroller');

routes.get('/AddRecord',passport.checkAuthentication, slidercontroller.AddRecord);

routes.get('/ViewRecord',passport.checkAuthentication, slidercontroller.ViewRecord);

routes.post('/insertsliderRecord', slidercontroller.insertsliderRecord);

routes.get('/deletesliderRecord/:id', slidercontroller.deletesliderRecord);

routes.get('/updatesliderRecord/:id', slidercontroller.updatesliderRecord);

routes.post('/editsliderRecord', slidercontroller.editsliderRecord);

module.exports = routes;    