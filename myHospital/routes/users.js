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
    var pPresentStreetNo = req.body.pPresentStreetNo;
    var pPresentStreetName = req.body.pPresentStreetName;
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

    db.query("INSERT INTO `Patient`(`admission_date`, `first_name`, `middle_name`, `last_name`, `birth_date`, `mobile1`, `mobile2`, `present_streetnum`, `present_streetname`, `present_area`, `present_thana`, `present_district`, `permanent_streetnum`, `permanent_streetname`, `permanent_area`, `permanent_thana`, `permanent_district`, `profession`, `amount_deposited`, `choice`) VALUES(? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)",[aDate, fName, mName, lName, bDate, mobile1, mobile2, pPresentStreetNo, pPresentStreetName, pPresentArea, pPresentThana, pPresentDistrict, pPerStreeNo, pPerStreetName, pPerArea, pPerThana, pPerDistrict, pProfession, pDepositedAmount, pChoice], function(err) {
        if(err) console.log('there is an error in insertion');
        req.flash('message', 'New Patient is added successfully!');
        res.redirect('/patient-profile');
    });
}


/* GET patient-profile page. */
router.showPatientProfile = function(req, res, next) {
    db.query('SELECT * From Patient ORDER by patient_id DESC LIMIT 1',[], function (err, result, fields) {
        if (err) throw err;
        //console.log(result[0]);
        res.render('patients/patientProfile', {pageTitile: 'Patient Profile', profileValue: result[0], message: req.flash('message')});
    });
};


/* GET patient-Initial Investigation Form. */
router.showPatientInvestigationForm = function(req, res, next) {
    db.query('SELECT * From Patient ORDER by patient_id DESC LIMIT 1',[], function (err, result, fields) {
        if (err) throw err;
        //console.log(result[0]);
        res.render('patients/patientInitialInvestigationForm', {pageTitile: 'Patient Investigation Form', profileValue: result[0], message: req.flash('Patient Initial Investigation Form')});
    });

};


router.postPatientInvestigationForm = function(req, res, next) {
        var patient_id = req.body.patient_id;
        var height = req.body.pHeight;
        var weight = req.body.pWeight;
        var symptom1 = req.body.symptom1;
        var symptom2 = req.body.symptom2;
        var symptom3 = req.body.symptom3;
        var low_bp = req.body.low_bp;
        var high_bp = req.body.high_bp;
        var breakfast1 = req.body.breakfast1;
        var breakfastk2 = req.body.breakfastk2;
        var breakfastk3 = req.body.breakfastk3;
        var lunch1 = req.body.lunch1;
        var lunch2 = req.body.lunch2;
        var lunch3 = req.body.lunch3;
        var dinner1 = req.body.dinner1;
        var dinner2 = req.body.dinner2;
        var dinner3 = req.body.dinner3;
        var hobby_game = req.body.hobby_game;
        var hobby_others = req.body.hobby_others;
        var disease = req.body.disease;
        var doctor_id = req.body.doctor_id;

        console.log(JSON.stringify(req.body));

        db.query("INSERT INTO `Patient_info`(`patient_id`, `height`, `weight`, `symptom1`, `symptom2`, `symptom3`, `low_bp`, `high_bp`, `breakfastk1`, `breakfastk2`, `breakfastk3`, `lunch1`, `lunch2`, `lunch3`, `dinner1`, `dinner2`, `dinner3`, `hobby_game`, `hobby_others`, `disease`, `doctor_id`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [patient_id, height, weight, symptom1, symptom2, symptom3, low_bp, high_bp, breakfast1, breakfastk2, breakfastk3, lunch1, lunch2, lunch3, dinner1, dinner2, dinner3, hobby_game, hobby_others, disease, doctor_id], function(err) {
            if(err) console.log('there is an error in postPatientInvestigationForm');
            req.flash('message', 'Patient Investigation info is added successfully!');
            res.redirect('/');
        });

};


//post doctor
router.postDoctorAdmissionForm = function(req, res, next) {

};

/* GET add-doctor Form. */
router.showDoctorAdmissionForm = function(req, res, next) {
    res.render('doctors/doctorInformation');
};

/* GET doctor-profile page. */
router.showDoctorProfile = function(req, res, next) {
    res.render('doctors/doctorProfile');
};


/* GET Medical Advise Form */
router.showMedicalAdviseForm = function(req, res, next) {
    db.query('SELECT * From Patient ORDER by patient_id DESC LIMIT 1',[], function (err, result, fields) {
        if (err) throw err;
        console.log('result = ' + result[0]);
        res.render('medicalAdvise', {pageTitile: 'Medical Advise Form', profileValue: result[0], message: req.flash('Medical Advise Form is updating!')});
    });
}


/* POST Medical Advise Form */
router.postMedicalAdviseForm = function(req, res, next) {

}

/* GET Nurse Entry Form. */
router.showNurseAdmissionForm = function(req, res, next) {
    res.render('nurses/nurseInformationForm');
}

/* GET Ward Information Form. */
router.showWordForm = function(req, res, next) {
    res.render('wards/wardInformationform');
}

router.showCabinForm = function(req, res, next) {
    res.render('cabins/cabinInformationform');
}

/* GET Medicine Entry Form. */
router.showMedicineEntryForm = function(req, res, next) {
    res.render('medicine/medicineEntryForm');
}


module.exports = router;
