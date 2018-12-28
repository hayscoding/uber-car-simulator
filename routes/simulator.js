var express = require('express');
var router = express.Router();
var fs = require('fs');

var DirectionsAPI = require('../utils/DirectionsAPI')

// ####################################
// ##########    ROUTING    ###########
// ####################################

router.get('/', function(req, res, next) {
	res.render('simulator', { title: 'Uber Clone Simulator' });
});

router.get('/store', function(req, res, next) {
	DirectionsAPI.getSimulatorPolylines((polylines) => {
		writePolylinesJson(polylines)
	})
  	res.render('message', {message: 'Storing new polylines...'});
})

router.get('/start', function(req, res, next) {
	const data = readPolylinesJson()
	res.render('polylines', { polylines: data });
});

module.exports = router;

// ####################################
// ######### 	FUNCTIONS    ##########
// ####################################


function writePolylinesJson(polylines) {
	var json = JSON.stringify(polylines);

	fs.writeFile('./public/json/polylines.json', json, 'utf8', (err) => { 
		if(err)
			throw err
		else
			console.log('wrote JSON to polylines.json')
	});
}

function readPolylinesJson() {
	return fs.readFileSync('./public/json/polylines.json', 'utf8');
}

