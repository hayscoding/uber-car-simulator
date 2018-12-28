var express = require('express');
var router = express.Router();

var DirectionsAPI = require('../utils/DirectionsAPI')

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
	DirectionsAPI.getSimulatorPolylines((polylines) => {
		console.log('polylines: ', polylines)
	})
	
  	res.render('polylines', { polylines: polylines });
});

module.exports = router;
