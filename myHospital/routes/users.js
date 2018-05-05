var express = require('express');
var router = express.Router();
var db = require('./db.js');


/* GET home page. */
router.showHome = function(req, res, next) {
    res.render('index', { title: 'TBA-Hospital' , pageTitle: 'Home'});
}

/* GET add-patient Form. */
router.showPatientAdmissionForm = function(req, res, next) {
    res.render('patients/patientAdmissionForm');
}


// Add-Patient (Submit From)
router.postPatientAdmissionForm = function(req, res, next) {
    var a = req.body.pname;
    console.log(a + ' okok');
}


/* GET add-doctor Form. */
router.showDoctorAdmissionForm = function(req, res, next) {
    res.render('doctors/doctorInformation');
}

/* GET doctor-profile page. */
router.showDoctorProfile = function(req, res, next) {
    res.render('doctors/doctorProfile');
}

/* GET patient-profile page. */
router.showPatientProfile = function(req, res, next) {
    res.render('patients/patientProfile');
}

/* GET patient-Initial Investigation Form. */
router.showPatientInvestigationForm = function(req, res, next) {
    res.render('patients/patientInitialInvestigationForm');
}

/* GET Nurse Entry Form. */
router.showNurseAdmissionForm = function(req, res, next) {
    res.render('nurses/nurseInformationForm');
}

/* GET Ward Information Form. */
router.showWordForm = function(req, res, next) {
    res.render('wards/wardInformationform');
}

/* GET Medicine Entry Form. */
router.showMedicineEntryForm = function(req, res, next) {
    res.render('medicine/medicineEntryForm');
}


module.exports = router;
