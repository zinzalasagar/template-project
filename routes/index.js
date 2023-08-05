const express = require('express');
const { route } = require('./admin');

const routes = express.Router();

routes.use('/admin',require('./admin'));

routes.use('/slider',require('./slider'));

routes.use('/category', require('./category'));
    
routes.use('/api', require('./api'));

routes.use('/api1',require('./api/v1/adminv1'));

routes.use('/student', require('./api/v1/student'));

routes.use('/faculty',require('./api/v1/faculty'));

module.exports = routes;