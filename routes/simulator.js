var express = require('express');
var router = express.Router();
var fs = require('fs');

var DirectionsAPI = require('../utils/DirectionsAPI')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('simulator', { title: 'Uber Clone Simulator' });
});

router.get('/store', function(req, res, next) {
	DirectionsAPI.getSimulatorPolylines((polylines) => {
		var json = JSON.stringify(polylines);

		// console.log('json: ',json)
		fs.writeFile('./public/json/polylines.json', json, 'utf8', (err) => { 
			if(err)
				throw err
			else
				console.log('wrote JSON to polylines.json')
		});
	})

  	res.render('polylines', { polylines: store });
})

router.get('/start', function(req, res, next) {
	fs.readFile('./public/json/polylines.json', function read(err, data) {
	    if (err) {
	        throw err;
	    }
  		
  		res.render('polylines', { polylines: data });
	});
});

module.exports = router;
