const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController');

// Auth routes
router.get('/', indexController.home);
router.get('/signup', authController.signupPage);
router.post('/signup', authController.signup);
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Jobs routes
router.get('/jobs', indexController.showJobs);
router.get('/jobs/new', indexController.newJobPage);
router.post('/jobs', indexController.createJob);
router.put('/jobs/:id', indexController.updateJob); // PUT for updating
router.delete('/jobs/:id', indexController.deleteJob); // DELETE for deleting

module.exports = router;
