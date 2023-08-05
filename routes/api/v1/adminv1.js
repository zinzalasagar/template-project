const express = require('express')

const passport = require('passport')

const routes = express.Router();

const apiadmincontroller = require('../../../controller/api/v1/apiadmincontroller');

routes.post('/adddata', apiadmincontroller.adddata);

routes.get('/getdata',passport.authenticate('jwt',{failureRedirect: false}),apiadmincontroller.getdata);

routes.delete('/deletedata/:id', apiadmincontroller.deletedata);

routes.put('/updatedata/:id', apiadmincontroller.updatedata);

routes.post('/tokenGenerate',apiadmincontroller.tokenGenerate);

module.exports = routes;