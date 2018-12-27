var express = require('express');
var router = express.Router();

var polylines = [
	'polyline1',
	'polyline2',
	'polyline3',
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('simulator', { title: 'Uber Clone Simulator' });
});

router.get('/start', function(req, res, next) {
  res.render('polylines', { polylines: polylines });
});

module.exports = router;
