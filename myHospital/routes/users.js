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
        else {

            db.query('SELECT * From Patient ORDER by patient_id DESC LIMIT 1',[], function (err, result, fields) {
                if (err) throw err;
                //console.log(result[0]);
                else {
                    var p_id = result[0].patient_id;

                    db.query('SELECT * From Bed Where status = ? ORDER by bed_id ASC LIMIT 1',["empty"], function (err1, result1, fields1) {
                        if (err1) throw err;
                        //console.log(result1[0].status);
                        else {
                            var b_id = result1[0].bed_id;

                            //inserting admit table
                            db.query("INSERT INTO `Admit`(`patient_id`, `bed_id`) VALUES(?,?)", [p_id, b_id], function(err) {
                                if(err) console.log('there is an error in Admit table insertion');
                            });

                            //updating bed status
                            db.query("UPDATE Bed SET status = ? Where bed_id = ?", ['Occupied', b_id], function(err) {
                                if(err) console.log('there is an error in bed status update!');
                            });
                        };
                    });
                };
            });
        };
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

        //console.log(JSON.stringify(req.body));

        db.query("INSERT INTO `Patient_info`(`patient_id`, `height`, `weight`, `symptom1`, `symptom2`, `symptom3`, `low_bp`, `high_bp`, `breakfastk1`, `breakfastk2`, `breakfastk3`, `lunch1`, `lunch2`, `lunch3`, `dinner1`, `dinner2`, `dinner3`, `hobby_game`, `hobby_others`, `disease`, `doctor_id`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [patient_id, height, weight, symptom1, symptom2, symptom3, low_bp, high_bp, breakfast1, breakfastk2, breakfastk3, lunch1, lunch2, lunch3, dinner1, dinner2, dinner3, hobby_game, hobby_others, disease, doctor_id], function(err) {
            if(err) console.log('there is an error in postPatientInvestigationForm');
            req.flash('message', 'Patient Investigation info is added successfully!');
            res.redirect('/');
        });

};



/* GET add-doctor Form. */
router.showDoctorAdmissionForm = function(req, res, next) {
    res.render('doctors/doctorInformation');
};

//post doctor
router.postDoctorAdmissionForm = function(req, res, next) {
    var first_name = req.body.dFname;
    var middle_name = req.body.dMname;
    var last_name = req.body.dLname;
    var birth_date = req.body.dbirthDate;
    var appointment_date = req.body.dAdmissionDate;
    //1 Q
    var degree1 = req.body.degree1;
    var institute1 = req.body.board1;
    var year11 = req.body.year1;
    var cgpa1 = req.body.cgpa1;
    var position1 = req.body.position1;

    //2 Q
    var degree2 = req.body.degree2;
    var institute2 = req.body.board2;
    var year12 = req.body.year2;
    var cgpa2 = req.body.cgpa2;
    var position2 = req.body.position2;
    //3 Q.
    var degree3 = req.body.degree3;
    var institute3 = req.body.board3;
    var year13 = req.body.year3;
    var cgpa3 = req.body.cgpa3;
    var position3 = req.body.position3;
    //4 Q
    var degree4 = req.body.degree4;
    var institute4 = req.body.board4;
    var year14 = req.body.year4;
    var cgpa4 = req.body.cgpa4;
    var position4 = req.body.position4;
    //5 Q
    var degree5 = req.body.degree5;
    var institute5 = req.body.board5;
    var year15 = req.body.year5;
    var cgpa5 = req.body.cgpa5;
    var position5 = req.body.position5;

    //1 Exp
    var job_title1 = req.body.dJob1;
    var from11 = req.body.dFrom1;
    var to11 = req.body.dTo1;
    var organization1 = req.body.dOrgan1;
    //2
    var job_title2 = req.body.dJob2;
    var from12 = req.body.dFrom2;
    var to12 = req.body.dTo2;
    var organization2 = req.body.dOrgan2;
    //3
    var job_title3 = req.body.dJob3;
    var from13 = req.body.dFrom3;
    var to13 = req.body.dTo3;
    var organization3 = req.body.dOrgan3;

    // 1 Membership
    var membership_type1 = req.body.dMemBMA;
    var membership_type2 = req.body.dMemBMS;
    var membership_type3 = req.body.dMemAMS;
    var membership_type4 =  req.body.dMemOthers;

    //console.log(req.body);

    db.query("INSERT INTO `Doctor`(`first_name`, `middle_name`, `last_name`, `birth_date`, `appointment_date`) VALUES(?,?,?,?,?)", [first_name, middle_name, last_name, birth_date, appointment_date], function(err) {
        if(err) console.log('there is an error in postDoctorAdmissionForm');
        //req.flash('message', 'Patient Investigation info is added successfully!');

        //finding last data inserted
        db.query('SELECT * From Doctor ORDER by doctor_id DESC LIMIT 1',[], function (err, result, fields) {
            if (err) throw err;
            //console.log('result (bed_id) = ' + result[0]);
            else{
                var doctor_id = result[0].doctor_id;
                //inserting Educational Qualifications
                db.query('INSERT INTO `Doc_educational_qualification`(`doctor_id`, `degree`, `institute`, `year1`, `cgpa`, `position`) VALUES(?,?,?,?,?,?)', [doctor_id, degree1, institute1, year11, cgpa1, position1], function(err) {
                        if(err) console.log('error in postNurseEdeuQualification-1');
                });
                //2
                db.query('INSERT INTO `Doc_educational_qualification`(`doctor_id`, `degree`, `institute`, `year1`, `cgpa`, `position`) VALUES(?,?,?,?,?,?)', [doctor_id, degree2, institute2, year12, cgpa2, position2], function(err) {
                        if(err) console.log('error in postNurseEdeuQualification-2');
                });
                //3
                db.query('INSERT INTO `Doc_educational_qualification`(`doctor_id`, `degree`, `institute`, `year1`, `cgpa`, `position`) VALUES(?,?,?,?,?,?)', [doctor_id, degree3, institute3, year13, cgpa3, position3], function(err) {
                        if(err) console.log('error in postNurseEdeuQualification-3');
                });
                //4
                db.query('INSERT INTO `Doc_educational_qualification`(`doctor_id`, `degree`, `institute`, `year1`, `cgpa`, `position`) VALUES(?,?,?,?,?,?)', [doctor_id, degree4, institute4, year14, cgpa4, position4], function(err) {
                        if(err) console.log('error in postNurseEdeuQualification-4');
                });
                //5
                db.query('INSERT INTO `Doc_educational_qualification`(`doctor_id`, `degree`, `institute`, `year1`, `cgpa`, `position`) VALUES(?,?,?,?,?,?)', [doctor_id, degree5, institute5, year15, cgpa5, position5], function(err) {
                        if(err) console.log('error in postNurseEdeuQualification-5');
                });


                // inserting job experience
                db.query('INSERT INTO `Doc_experience`(`doctor_id`, `job_title`, `from1`, `to1`, `organization`)  VALUES(?,?,?,?,?)', [doctor_id, job_title1, from11, to11, organization1], function(err) {
                        if(err) console.log('error in postDoctorJobExperience-1');
                });
                //2
                db.query('INSERT INTO `Doc_experience`(`doctor_id`, `job_title`, `from1`, `to1`, `organization`) VALUES(?,?,?,?,?)', [doctor_id, job_title2, from12, to12, organization2], function(err) {
                        if(err) console.log('error in postDoctorJobExperience-2');
                });
                //3
                db.query('INSERT INTO `Doc_experience`(`doctor_id`, `job_title`, `from1`, `to1`, `organization`) VALUES(?,?,?,?,?)', [doctor_id, job_title3, from13, to13, organization3], function(err) {
                        if(err) console.log('error in postDoctorJobExperience-3');
                });

                // inserting membership
                if(membership_type1) {
                    db.query('INSERT INTO `Membership`(`doctor_id`, `membership_type`) VALUES(?,?)', [doctor_id, membership_type1], function(err) {
                            if(err) console.log('error in postDoctorMembershipType-1');
                    });
                }
                //2
                if(membership_type2) {
                    db.query('INSERT INTO `Membership`(`doctor_id`, `membership_type`) VALUES(?,?)', [doctor_id, membership_type2], function(err) {
                            if(err) console.log('error in postDoctorMembershipType-2');
                    });
                };
                //
                if(membership_type3) {
                    db.query('INSERT INTO `Membership`(`doctor_id`, `membership_type`) VALUES(?,?)', [doctor_id, membership_type3], function(err) {
                            if(err) console.log('error in postDoctorMembershipType-3');
                    });
                };
                //4
                if(membership_type4) {
                    db.query('INSERT INTO `Membership`(`doctor_id`, `membership_type`) VALUES(?,?)', [doctor_id, membership_type4], function(err) {
                            if(err) console.log('error in postDoctorMembershipType-4');
                    });
                };
            };

        });
        res.redirect('/');
    });
};

/* GET doctor-profile page. */
router.showDoctorProfile = function(req, res, next) {
    res.render('doctors/doctorProfile');
};


/* GET Medical Advise Form */
router.showMedicalAdviseForm = function(req, res, next) {
    db.query('SELECT * From Patient ORDER by patient_id DESC LIMIT 1',[], function (err, result, fields) {
        if (err) throw err;
        //console.log('result = ' + result[0]);
        res.render('medicalAdvise', {pageTitile: 'Medical Advise Form', profileValue: result[0], message: req.flash('Medical Advise Form is updating!')});
    });
}


/* POST Medical Advise Form */
router.postMedicalAdviseForm = function(req, res, next) {
    var patient_id = req.body.patient_id;
    var doctor_id = req.body.doctor_id;
    var date_of_advise = req.body.medicineAdviseDate;

    //var prescription_id = req.body.
    //1
    var medicine_id1 = req.body.medicineId1;
    var name_med1 = req.body.name1;
    var quantity1 = req.body.quantity1;
    var times_a_day1 = req.body.times_a_day1;
    var morning1 = req.body.morning1;
    var noon1 = req.body.noon1;
    var evening1 = req.body.evening1;

    //2
    var medicine_id2 = req.body.medicineId2;
    var name_med2 = req.body.name2;
    var quantity2 = req.body.quantity2;
    var times_a_day2 = req.body.times_a_day2;
    var morning2 = req.body.morning2;
    var noon2 = req.body.noon2;
    var evening2 = req.body.evening2;

    //3
    var medicine_id3 = req.body.medicineId3;
    var name_med3 = req.body.name3;
    var quantity3 = req.body.quantity3;
    var times_a_day3 = req.body.times_a_day3;
    var morning3 = req.body.morning3;
    var noon3 = req.body.noon3;
    var evening3 = req.body.evening3;
    //var med_cost = req.body.

    var test_name1 = req.body.testName1;
    var test_no1 = req.body.testNo1;
    var test_name2 = req.body.testName1;
    var test_no2 = req.body.testNo1;

    console.log(req.body);

    db.query("INSERT INTO `Prescription`(`patient_id`, `doctor_id`, `date_of_advise`) VALUES(?,?,?)", [patient_id, doctor_id, date_of_advise], function(err) {
        if(err) console.log('there is an error in postMedicalAdviseForm');
        //req.flash('message', 'Patient Investigation info is added successfully!');
        else {
            db.query('SELECT * From Prescription ORDER by prescription_id DESC LIMIT 1',[], function (err, result, fields) {
                if (err) throw err;
                //console.log('result = ' + result[0]);

                var prescription_id = result[0].prescription_id;

                //inserting test Advised by doctor
                if(test_no1 || test_name1) {
                    db.query("INSERT INTO `Test`(`prescription_id`, `patient_id`, `doctor_id`, `test_name`, `test_no`) VALUES(?,?,?,?,?)", [prescription_id, patient_id, doctor_id, test_name1, test_no1], function(err) {
                        if(err) console.log('there is an error in postMedicalAdviseForm - test Record 1');
                        //req.flash('message', 'Patient Investigation info is added successfully!');
                    });
                };

                if(test_no2 || test_name2) {
                    db.query("INSERT INTO `Test`(`prescription_id`, `patient_id`, `doctor_id`, `test_name`, `test_no`) VALUES(?,?,?,?,?)", [prescription_id, patient_id, doctor_id, test_name2, test_no2], function(err) {
                        if(err) console.log('there is an error in postMedicalAdviseForm - test Record 2');
                        //req.flash('message', 'Patient Investigation info is added successfully!');
                    });
                };


                //inserting med_prescription data
                //1
                if(medicine_id1) {
                    var med_cost1 = 0;
                    db.query('SELECT * From Medicine Where medicine_id = ?',[medicine_id1], function (err, result, fields) {
                        if (err) throw err;
                        //console.log('medicine_id = ' + result[0].unit_price);
                        med_cost1 = quantity1 * result[0].unit_price;

                        db.query("INSERT INTO `Med_prescription`(`prescription_id`, `patient_id`, `doctor_id`, `medicine_id`, `name_med`, `quantity`, `times_a_day`, `morning`, `noon`, `evening`, `med_cost`) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [prescription_id, patient_id, doctor_id, medicine_id1, name_med1, quantity1, times_a_day1, morning1, noon1, evening1, med_cost1], function(err) {
                            if(err) console.log('there is an error in postMedicalAdviseForm - Med_prescription 1');
                            //req.flash('message', 'Patient Investigation info is added successfully!');
                        });
                    });
                };

                //2
                if(medicine_id2) {
                    var med_cost2 = 0;

                    db.query('SELECT * From Medicine Where medicine_id = ?',[medicine_id2], function (err, result, fields) {
                        if (err) throw err;
                        //console.log('medicine_id = ' + result[0]);
                        med_cost2 = quantity2 * result[0].unit_price;

                        db.query("INSERT INTO `Med_prescription`(`prescription_id`, `patient_id`, `doctor_id`, `medicine_id`, `name_med`, `quantity`, `times_a_day`, `morning`, `noon`, `evening`, `med_cost`) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [prescription_id, patient_id, doctor_id, medicine_id2, name_med2, quantity2, times_a_day2, morning2, noon2, evening2, med_cost2], function(err) {
                            if(err) console.log('there is an error in postMedicalAdviseForm - Med_prescription 2');
                            //req.flash('message', 'Patient Investigation info is added successfully!');
                        });
                    });
                };

                //3
                if(medicine_id3) {
                    var med_cost3 = 0;

                    db.query('SELECT * From Medicine Where medicine_id = ?',[medicine_id1], function (err, result, fields) {
                        if (err) throw err;
                        //console.log('medicine_id = ' + result[0]);
                        med_cost3 = quantity3 * result[0].unit_price;

                        db.query("INSERT INTO `Med_prescription`(`prescription_id`, `patient_id`, `doctor_id`, `medicine_id`, `name_med`, `quantity`, `times_a_day`, `morning`, `noon`, `evening`, `med_cost`) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [prescription_id, patient_id, doctor_id, medicine_id3, name_med3, quantity3, times_a_day3, morning3, noon3, evening3, med_cost3], function(err) {
                            if(err) console.log('there is an error in postMedicalAdviseForm - Med_prescription 3');
                            req.flash('message', 'Patient Investigation info is added successfully!');
                            res.render('error', {pageTitile: 'Patient Investigation Form', result: [], message: req.flash('Medicine Advice record stored successfully!')});
                        });
                    });
                };

            });
        };
        //res.redirect('/');
    });
};

/* GET Nurse Entry Form. */
router.showNurseAdmissionForm = function(req, res, next) {
    res.render('nurses/nurseInformationForm');
}


router.postNurseAdmissionForm = function(req, res, next) {
    var first_name = req.body.nFname;
    var middle_name = req.body.nMname;
    var last_name = req.body.nLname;
    var birth_date = req.body.birthDate;
    var appointment_date = req.body.appoinmentDate;

    var degree1 = req.body.degree1;
    var institute1 = req.body.board1;
    var year11 = req.body.year1;
    var cgpa1 = req.body.cgpa1;
    var position1 = req.body.position1;

    var job_title1 = req.body.nJob1;
    var from11 = req.body.nFrom1;
    var to11 = req.body.nTo1;
    var organization1 = req.body.nOrgan1;
    //2
    var degree2 = req.body.degree2;
    var institute2 = req.body.board2;
    var year12 = req.body.year2;
    var cgpa2 = req.body.cgpa2;
    var position2 = req.body.position2;

    var job_title2 = req.body.nJob2;
    var from12 = req.body.nFrom2;
    var to12 = req.body.nTo2;
    var organization2 = req.body.nOrgan2;
    //3
    var degree3 = req.body.degree3;
    var institute3 = req.body.board3;
    var year13 = req.body.year3;
    var cgpa3 = req.body.cgpa3;
    var position3 = req.body.position3;

    var job_title3 = req.body.nJob3;
    var from13 = req.body.nFrom3;
    var to13 = req.body.nTo3;
    var organization3 = req.body.nOrgan3;
    //4
    var degree4 = req.body.degree4;
    var institute4 = req.body.board4;
    var year14 = req.body.year4;
    var cgpa4 = req.body.cgpa4;
    var position4 = req.body.position4;

    console.log(req.body);

    db.query("INSERT INTO `Nurse`(`first_name`, `middle_name`, `last_name`, `birth_date`, `appointment_date`) VALUES(?,?,?,?,?)", [first_name, middle_name, last_name, birth_date, appointment_date], function(err) {
        if(err) console.log('there is an error in postNurseAdmissionForm');
        //req.flash('message', 'Patient Investigation info is added successfully!');

        //finding last data inserted
        db.query('SELECT * From Nurse ORDER by nurse_id DESC LIMIT 1',[], function (err, result, fields) {
            if (err) throw err;
            //console.log('result (bed_id) = ' + result[0]);
            else{
                var nurse_id = result[0].nurse_id;
                //inserting Educational Qualifications
                db.query('INSERT INTO `Nurse_educational_qualification`(`nurse_id`, `degree`, `institute`, `year1`, `cgpa`, `position`) VALUES(?,?,?,?,?,?)', [nurse_id, degree1, institute1, year11, cgpa1, position1], function(err) {
                        if(err) console.log('error in postNurseEdeuQualification-1');
                });
                //2
                db.query('INSERT INTO `Nurse_educational_qualification`(`nurse_id`, `degree`, `institute`, `year1`, `cgpa`, `position`) VALUES(?,?,?,?,?,?)', [nurse_id, degree2, institute2, year12, cgpa2, position2], function(err) {
                        if(err) console.log('error in postNurseEdeuQualification-2');
                });
                //3
                db.query('INSERT INTO `Nurse_educational_qualification`(`nurse_id`, `degree`, `institute`, `year1`, `cgpa`, `position`) VALUES(?,?,?,?,?,?)', [nurse_id, degree3, institute3, year13, cgpa3, position3], function(err) {
                        if(err) console.log('error in postNurseEdeuQualification-3');
                });
                //4
                db.query('INSERT INTO `Nurse_educational_qualification`(`nurse_id`, `degree`, `institute`, `year1`, `cgpa`, `position`) VALUES(?,?,?,?,?,?)', [nurse_id, degree4, institute4, year14, cgpa4, position4], function(err) {
                        if(err) console.log('error in postNurseEdeuQualification-4');
                });

                // inserting job experience
                db.query('INSERT INTO `Nurse_experience`(`nurse_id`, `job_title`, `from1`, `to1`, `organization`) VALUES(?,?,?,?,?)', [nurse_id, job_title1, from11, to11, organization1], function(err) {
                        if(err) console.log('error in postNurseJobExperience-1');
                });
                //2
                db.query('INSERT INTO `Nurse_experience`(`nurse_id`, `job_title`, `from1`, `to1`, `organization`) VALUES(?,?,?,?,?)', [nurse_id, job_title2, from12, to12, organization2], function(err) {
                        if(err) console.log('error in postNurseJobExperience-1');
                });
                //3
                db.query('INSERT INTO `Nurse_experience`(`nurse_id`, `job_title`, `from1`, `to1`, `organization`) VALUES(?,?,?,?,?)', [nurse_id, job_title3, from13, to13, organization3], function(err) {
                        if(err) console.log('error in postNurseJobExperience-1');
                        res.redirect('/');
                });
            };

        });
    });

}



/* GET Ward Information Form. */
router.showWordForm = function(req, res, next) {
    res.render('wards/wardInformationform');
}

/* POST ward Information form */
router.postWordForm = function(req, res, next) {
    console.log("i am here at postWordForm");
    var name = req.body.wName;
    var nurseId = req.body.wNurseID;
    //var bedNo1 = req.body.wBno1;
    var type1 = req.body.wBtype1;
    var rent1 = req.body.wBrent1;
    var status1 = req.body.wStatus1;

    //var bedNo2 = req.body.wBno2;
    var type2 = req.body.wBtype2;
    var rent2 = req.body.wBrent2;
    var status2 = req.body.wStatus2;

    //var bedNo3 = req.body.wBno3;
    var type3 = req.body.wBtype3;
    var rent3 = req.body.wBrent3;
    var status3 = req.body.wStatus3;

    var choice = 'Ward'; //
    //console.log(JSON.stringify(req.body));

    //inserting into bed
    db.query('INSERT INTO `Bed`(`type`, `rent`, `status`, `nurse_id`, `choice`) VALUES(?,?,?,?,?)', [type1, rent1, status1, nurseId, choice], function(err) {
            if(err) console.log('error in postWordForm');
            //finding last data inserted
            db.query('SELECT * From Bed ORDER by bed_id DESC LIMIT 1',[], function (err, result, fields) {
                if (err) throw err;
                //console.log('result (bed_id) = ' + result[0]);

                var bed_id = result[0].bed_id;
                //inserting into ward
                db.query('INSERT INTO `Ward`(`name`, `bed_id`) VALUES(?,?)', [name, bed_id], function(err) {
                        if(err) console.log('error in postWordForm');
                });
            });
    });

    // for 2nd bed
    db.query('INSERT INTO `Bed`(`type`, `rent`, `status`, `nurse_id`, `choice`) VALUES(?,?,?,?,?)', [type2, rent2, status2, nurseId, choice], function(err) {
            if(err) console.log('error in postWordForm');
            //finding last data inserted
            db.query('SELECT * From Bed ORDER by bed_id DESC LIMIT 1',[], function (err, result, fields) {
                if (err) throw err;
                //console.log('result (bed_id) = ' + result[0]);

                var bed_id = result[0].bed_id;
                //inserting into ward
                db.query('INSERT INTO `Ward`(`name`, `bed_id`) VALUES(?,?)', [name, bed_id], function(err) {
                        if(err) console.log('error in postWordForm');
                });
            });
    });

    // for 3rd bed
    db.query('INSERT INTO `Bed`(`type`, `rent`, `status`, `nurse_id`, `choice`) VALUES(?,?,?,?,?)', [type3, rent3, status3, nurseId, choice], function(err) {
            if(err) console.log('error in postWordForm');
            //finding last data inserted
            db.query('SELECT * From Bed ORDER by bed_id DESC LIMIT 1',[], function (err, result, fields) {
                if (err) throw err;
                //console.log('result (bed_id) = ' + result[0]);

                var bed_id = result[0].bed_id;
                //inserting into ward
                db.query('INSERT INTO `Ward`(`name`, `bed_id`) VALUES(?,?)', [name, bed_id], function(err) {
                        if(err) console.log('error in postWordForm');
                        res.redirect('/');
                });
            });
    });

};



/* Cabin's information */
router.showCabinForm = function(req, res, next) {
    res.render('cabins/cabinInformationform');
}

router.postCabinForm = function(req, res, next) {
    var name = req.body.cName;
    var nurseId = req.body.cNurseID;
    //var bedNo1 = req.body.wBno1;
    var type1 = req.body.cBtype1;
    var rent1 = req.body.cBrent1;
    var status1 = req.body.cStatus1;

    var choice = 'Cabin'; // const.
    //console.log(JSON.stringify(req.body));

    db.query('INSERT INTO `Bed`(`type`, `rent`, `status`, `nurse_id`, `choice`) VALUES(?,?,?,?,?)', [type1, rent1, status1, nurseId, choice], function(err) {
            if(err) console.log('error in postWordForm');
            //finding last data inserted
            db.query('SELECT * From Bed ORDER by bed_id DESC LIMIT 1',[], function (err, result, fields) {
                if (err) throw err;
                //console.log('result (bed_id) = ' + result[0]);

                var bed_id = result[0].bed_id;
                //inserting into ward
                db.query('INSERT INTO `Cabin`(`name`, `bed_id`) VALUES(?,?)', [name, bed_id], function(err) {
                        if(err) console.log('error in postWordForm');
                        res.redirect('/');
                });

            });
    });
}



/* GET Medicine Entry Form. */
router.showMedicineEntryForm = function(req, res, next) {
    res.render('medicine/medicineEntryForm');
}

/*  POST medicine entry */
router.postMedicineEntryForm = function(req, res, next) {
    var supplier_id = req.body.mSupId;
    var supplier_name = req.body.mSupName;
    var date_of_supply = req.body.mSupplyDate;

    var name1 = req.body.mName1;
    var type1 = req.body.mType1;
    var unit_price1 = req.body.mUnitPrice1;
    var quantity1 = req.body.mQuantity1;
    var manufacture_date1 = req.body.mManufactureDate1;
    var expiry_date1 = req.body.mExpiryDate1;

    var name2 = req.body.mName2;
    var type2 = req.body.mType2;
    var unit_price2 = req.body.mUnitPrice2;
    var quantity2 = req.body.mQuantity2;
    var manufacture_date2 = req.body.mManufactureDate2;
    var expiry_date2 = req.body.mExpiryDate2;

    var name3 = req.body.mName3;
    var type3 = req.body.mType3;
    var unit_price3 = req.body.mUnitPrice3;
    var quantity3 = req.body.mQuantity3;
    var manufacture_date3 = req.body.mManufactureDate3;
    var expiry_date3 = req.body.mExpiryDate3;

    var name4 = req.body.mName4;
    var type4 = req.body.mType4;
    var unit_price4 = req.body.mUnitPrice4;
    var quantity4 = req.body.mQuantity4;
    var manufacture_date4 = req.body.mManufactureDate4;
    var expiry_date4 = req.body.mExpiryDate4;

    //console.log(JSON.stringify(req.body));

    db.query("INSERT INTO `Medicine`(`supplier_id`, `supplier_name`, `date_of_supply`, `name`, `type`, `unit_price`, `quantity`, `manufacture_date`, `expiry_date`) VALUES(?,?,?,?,?,?,?,?,?)", [supplier_id, supplier_name, date_of_supply, name1, type1, unit_price1, quantity1, manufacture_date1, expiry_date1], function(err) {
        if(err) console.log('there is an error in postMedicineEntryForm 1');
    });

    db.query("INSERT INTO `Medicine`(`supplier_id`, `supplier_name`, `date_of_supply`, `name`, `type`, `unit_price`, `quantity`, `manufacture_date`, `expiry_date`) VALUES(?,?,?,?,?,?,?,?,?)", [supplier_id, supplier_name, date_of_supply, name2, type2, unit_price2, quantity2, manufacture_date2, expiry_date2], function(err) {
        if(err) console.log('there is an error in postMedicineEntryForm 2');
    });

    db.query("INSERT INTO `Medicine`(`supplier_id`, `supplier_name`, `date_of_supply`, `name`, `type`, `unit_price`, `quantity`, `manufacture_date`, `expiry_date`) VALUES(?,?,?,?,?,?,?,?,?)", [supplier_id, supplier_name, date_of_supply, name3, type3, unit_price3, quantity3, manufacture_date3, expiry_date3], function(err) {
        if(err) console.log('there is an error in postMedicineEntryForm 3');
    });

    db.query("INSERT INTO `Medicine`(`supplier_id`, `supplier_name`, `date_of_supply`, `name`, `type`, `unit_price`, `quantity`, `manufacture_date`, `expiry_date`) VALUES(?,?,?,?,?,?,?,?,?)", [supplier_id, supplier_name, date_of_supply, name4, type4, unit_price4, quantity4, manufacture_date4, expiry_date4], function(err) {
        if(err) console.log('there is an error in postMedicineEntryForm 4');
        res.redirect('/');
    });
}



module.exports = router;
