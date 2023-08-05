const express = require('express');

const passport = require('passport');

const routes = express.Router();

const apicontroller = require('../controller/apicontroller');

routes.post('/addapidata',apicontroller.addapidata);

routes.get('/getData',passport.authenticate('jwt',{'failureRedirect':false}),apicontroller.getData);

routes.get('/deleteData/:id',apicontroller.deleteData);

routes.post('/upDate',apicontroller.upDate);

routes.post('/tokenGenerate',apicontroller.tokenGenerate);

routes.delete('/deleteRecord/:id',apicontroller.deleteRecord);

routes.put('/dataupdate/:id',apicontroller.dataupdate);

routes.patch('/patchupdatedata/:id',apicontroller.patchupdatedata);

module.exports = routes;    