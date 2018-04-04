var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'myHospital' });
});

router.get('/doctor-registration', function(req, res, next) {
  res.render('doctors/doctorRegistration');
});

module.exports = router;
