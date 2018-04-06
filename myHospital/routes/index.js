var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TBA-Hospital' });
});

/* GET add-patient Form. */
router.get('/add-patient', function(req, res, next) {
  res.render('patients/patientAdmissionForm');
});

/* GET add-doctor Form. */
router.get('/add-doctor', function(req, res, next) {
  res.render('doctors/doctorInformation');
});

/* GET doctor-profile page. */
router.get('/doctor-profile', function(req, res, next) {
  res.render('doctors/doctorProfile');
});

/* GET patient-profile page. */
router.get('/patient-profile', function(req, res, next) {
  res.render('patients/patientProfile');
});

/* GET patient-Initial Investigation Form. */
router.get('/patient-investigation', function(req, res, next) {
  res.render('patients/patientInitialInvestigationForm');
});


/* GET Nurse Entry Form. */
router.get('/add-nurse', function(req, res, next) {
  res.render('nurses/nurseInformationForm');
});

/* GET Ward Information Form. */
router.get('/add-ward', function(req, res, next) {
  res.render('wards/wardInformationform');
});

/* GET Medicine Entry Form. */
router.get('/add-medicine', function(req, res, next) {
  res.render('medicine/medicineEntryForm');
});

module.exports = router;
