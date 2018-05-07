/*
var express = require('express');
var router = express.Router();
var db = require('./db.js');
*/

var dataController = require('./users.js');

module.exports = function(newApp) {
    /* GET home page. */
    newApp.get('/', dataController.showHome);

    /* patient */
    newApp.get('/add-patient', dataController.showPatientAdmissionForm);
    newApp.post('/add-patient', dataController.postPatientAdmissionForm);


    /* patient-Initial Investigation Form. */
    newApp.get('/patient-investigation', dataController.showPatientInvestigationForm);


    /* patient-profile page. */
    newApp.get('/patient-profile', dataController.showPatientProfile);


    /* Doctor */
    newApp.get('/add-doctor', dataController.showDoctorAdmissionForm);
    newApp.get('/add-doctor', dataController.postDoctorAdmissionForm);


    /* doctor-profile page. */
    newApp.get('/doctor-profile', dataController.showDoctorProfile);



    /* Nurse */
    newApp.get('/add-nurse', dataController.showNurseAdmissionForm);


    /* Ward */
    newApp.get('/add-ward', dataController.showWordForm);


    /* GET Medicine Entry Form. */
    newApp.get('/add-medicine', dataController.showMedicineEntryForm);
}
