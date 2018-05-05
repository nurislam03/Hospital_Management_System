/*
var express = require('express');
var router = express.Router();
var db = require('./db.js');
*/

var dataController = require('./users.js');

module.exports = function(newApp) {
    /* GET home page. */
    newApp.get('/', dataController.showHome);

    /* GET add-patient Form. */
    newApp.get('/add-patient', dataController.showPatientAdmissionForm);

    // Add-Patient (Submit From)
    newApp.post('/add-patient', dataController.postPatientAdmissionForm);

    /* GET add-doctor Form. */
    newApp.get('/add-doctor', dataController.showDoctorAdmissionForm);

    /* GET doctor-profile page. */
    newApp.get('/doctor-profile', dataController.showDoctorProfile);

    /* GET patient-profile page. */
    newApp.get('/patient-profile', dataController.showPatientProfile);

    /* GET patient-Initial Investigation Form. */
    newApp.get('/patient-investigation', dataController.showPatientInvestigationForm);

    /* GET Nurse Entry Form. */
    newApp.get('/add-nurse', dataController.showNurseAdmissionForm);

    /* GET Ward Information Form. */
    newApp.get('/add-ward', dataController.showWordForm);

    /* GET Medicine Entry Form. */
    newApp.get('/add-medicine', dataController.showMedicineEntryForm);
}
