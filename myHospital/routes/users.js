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
    var aDate = req.body.pAdmissionDate;
    var fName = req.body.pFname;
    var mName = req.body.pMname;
    var lName = req.body.pLname;
    var bDate = req.body.pbirthDate;
    var mobile1 = req.body.pMobile1;
    var mobile2 = req.body.pMobile2;
    var pPresentStreeNo = req.body.pPerStreeNo;
    var pPresentStreetName = req.body.pStreetName;
    var pPresentArea = req.body.pPresentArea;
    var pPresentThana = req.body.pPresentThana;
    var pPresentDistrict = req.body.pPresentDistrict;
    var pPerStreeNo = req.body.pPerStreeNo;
    var pPerStreetName = req.body.pPerStreetName;
    var pPerArea = req.body.pPerArea;
    var pPerThana = req.body.pPerThana;
    var pPerDistrict = req.body.pPerDistrict;
    var pProfession = req.body.pProfession;
    var pDepositedAmount = req.body.pDepositedAmount;
    var pChoice = req.body.pChoice;
    var pAdvisiorName = req.body.pAdvisiorName;
    var pAdvisiorRelation = req.body.pAdvisiorRelation;

    //console.log(JSON.stringify(req.body));

    db.query("INSERT INTO `Patient`(`admission_date`, `first_name`, `middle_name`, `last_name`, `birth_date`, `mobile1`, `mobile2`, `present_streetnum`, `present_streetname`, `present_area`, `present_thana`, `present_district`, `permanent_streetnum`, `permanent_streetname`, `permanent_area`, `permanent_thana`, `permanent_district`, `profession`, `amount_deposited`, `choice`) VALUES(? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)",[aDate, fName, mName, lName, bDate, mobile1, mobile2, pPresentStreeNo, pPresentStreetName, pPresentArea, pPresentThana, pPresentDistrict, pPerStreeNo, pPerStreetName, pPerArea, pPerThana, pPerDistrict, pProfession, pDepositedAmount, pChoice], function(err, res, next) {
        if(err) console.log('there is an error in insertion');
        //req.flash('message', 'New Patient is added successfully!');
        //res.redirect('/add-patient');
    });
}


//post doctor
router.postDoctorAdmissionForm = function(req, res, next) {
    
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
