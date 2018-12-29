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

router.get('/start', function(req, res, next) {
	var simDrivers = getSimulatedDrivers()
	runSimulation(simDrivers)
	res.render('message', { message: 'Starting simulation...' });
});

router.get('/store', function(req, res, next) {
	DirectionsAPI.getSimulatorPolylines((polylines) => {
		writeSimulationJson(polylines)
	})
  	res.render('message', { message: 'Storing new polylines...' });
})

router.get('/data', function(req, res, next) {
	const data = readPolylinesJson()
	res.render('data', { data: data });
})

module.exports = router;

// ####################################
// ######### 	FUNCTIONS    ##########
// ####################################

function getSimulatedDrivers() {
	return JSON.parse(readPolylinesJson())
}

function runSimulation(simDrivers) {
    simDrivers.forEach((simDriver) => {
        simulateDriverOnPolyline(simDriver)
    })
}

function simulateDriverOnPolyline(simDriver) {
    simDriver.polyline.forEach((coord) => {
		console.log('polyline coord: ', coord)
	})
}

function updateDriverLocation(uid, coord) {

}



function getPolyline(index) {

}

function createSimulatedDriver(index, polyline) {
	const uid = 'simulated'+index

	return {
		uid: uid,
		currentIndex: 0,
		polyline: polyline,
	}
}

function createSimulatedDriverJson(polylines) {
	var data = []

	for(var i = 0; i < polylines.length; i++) {
		data.push(createSimulatedDriver(i, polylines[i]))
	}

	return JSON.stringify(data)
}

function writeSimulationJson(polylines) {
	var json = createSimulatedDriverJson(polylines)

	fs.writeFile('./public/json/simulation.json', json, 'utf8', (err) => { 
		if(err)
			throw err
		else
			console.log('wrote JSON to polylines.json')
	});
}

function readPolylinesJson() {
	return fs.readFileSync('./public/json/simulation.json', 'utf8');
}

