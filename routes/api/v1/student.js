const express = require('express');

const passport = require('passport');

const routes = express.Router(); 

const studentcontrolle = require('../../../controller/api/v1/studentsadmincontroller');

routes.post('/Adddata', studentcontrolle.Adddata);

routes.get('/viewdata',passport.authenticate('jwt',{failureRedirect:false}),studentcontrolle.Viewdata);

routes.delete('/deleteRecord/:id', studentcontrolle.DeleteRecord);

routes.put('/updateRecord/:id', studentcontrolle.updateRecord);

routes.post('/tokenGenrate',studentcontrolle.TokenGenrate);

module.exports = routes;