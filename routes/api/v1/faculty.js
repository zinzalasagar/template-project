const express = require('express');

const passport = require('passport');

const routes = express.Router();

const facultycontroller = require('../../../controller/api/v1/facultycontroller');

    routes.post('/adddata',facultycontroller.adddata);

    routes.get('/getdata',facultycontroller.getdata);

    routes.get('/deleteData/:id',facultycontroller.deleteData);

    routes.put('/UpDate/:id',facultycontroller.UpDate);

    routes.post('/TokenGenrate',facultycontroller.TokenGenrate);

module.exports = routes;