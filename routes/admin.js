const express = require('express');

const passport = require('passport');

const routes = express.Router();

const adminController = require('../controller/Admincontroller');

routes.get('/',adminController.login);

routes.get('/dashboard', adminController.dashboard);

routes.get('/AddRecord', adminController.AddRecord);

routes.get('/ViewRecord', adminController.ViewRecord);

routes.post('/insertAdminRecord', adminController.insertAdminRecord);

routes.get('/deleteAdminRecord/:id', adminController.DeleteAdminRecord);

routes.get('/updateAdminRecord/:id', adminController.upadateAdminRecord);

routes.post('/editAdminRecord',adminController.editAdminRecord);

routes.post('/chockLogin',passport.authenticate('local',{failureRedirect : "/admin/"}),adminController.chockLogin);

routes.get('/changepassword',passport.checkAuthentication,adminController.changepassword);

routes.post('/confirmChangePass',passport.checkAuthentication,adminController.confirmChangePass);

routes.get('/Logout',adminController.logout);

routes.get('/lostpassword',passport.checkAuthentication ,adminController.lostpassword);

routes.post('/ForgotPassword',adminController.ForgotPassword);

routes.get('/check_otp', adminController.checkOTP);

routes.post('/checkOTPData', adminController.checkOTPData);

routes.get('/confirmPassword',passport.checkAuthentication, adminController.confirmPassword);

routes.post('/confirmPassData', adminController.confirmPassData);

routes.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

routes.get('/auth/users/callback', passport.authenticate('google', { failureRedirect: '/login' }),adminController.chockLogin);

module.exports = routes;    