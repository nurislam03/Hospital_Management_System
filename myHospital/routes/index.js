var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TBA-Hospital' });
});

router.get('/patient-admission', function(req, res, next) {
  res.render('patients/patientAdmissionForm');
});

router.get('/doctor-registration', function(req, res, next) {
  res.render('doctors/doctorRegistration');
});
router.get('/doctor-profile', function(req, res, next) {
  res.render('doctors/doctorProfile');
});

module.exports = router;
