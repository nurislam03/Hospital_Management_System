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
    newApp.post('/patient-investigation', dataController.postPatientInvestigationForm);

    /* patient Detailed bill*/
    newApp.post('/patient-bill', dataController.showPatientDetailedBillForm);

    /* patient-profile page. */
    newApp.get('/patient-profile', dataController.showPatientProfile);


    /* Doctor */
    newApp.get('/add-doctor', dataController.showDoctorAdmissionForm);
    newApp.post('/add-doctor', dataController.postDoctorAdmissionForm);

    newApp.get('/doctor-bill', dataController.showDoctorDetailedBill);


    /* doctor-profile page. */
    newApp.get('/doctor-profile', dataController.showDoctorProfile);


    /* Medical Advise */
    newApp.get('/medical-advise', dataController.showMedicalAdviseForm);
    newApp.post('/medical-advise', dataController.postMedicalAdviseForm);

    /* Nurse */
    newApp.get('/add-nurse', dataController.showNurseAdmissionForm);
    newApp.post('/add-nurse', dataController.postNurseAdmissionForm);


    /* Ward */
    newApp.get('/add-ward', dataController.showWordForm);
    newApp.post('/add-ward', dataController.postWordForm);

    /* Ward */
    newApp.get('/add-cabin', dataController.showCabinForm);
    newApp.post('/add-cabin', dataController.postCabinForm);


    /* GET Medicine Entry Form. */
    newApp.get('/add-medicine', dataController.showMedicineEntryForm);
    newApp.post('/add-medicine', dataController.postMedicineEntryForm);

    /* Medicine Bill*/
    newApp.get('/medicine-bill', dataController.showMedicineBill);
}
