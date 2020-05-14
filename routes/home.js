const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const homeController = require('../controllers/homeController'); //shows a welcome page after singing in and list of patients

router.get('/', homeController.listofPatients); //shows home/pulpit page

router.get('/addPatient', homeController.addPatient);
router.post('/savedPatient', homeController.savePatient);
router.get('/db', homeController.getAllUsers);

module.exports = router;