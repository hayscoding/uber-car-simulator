var express = require('express');
var router = express.Router();
var fs = require('fs');

var DirectionsAPI = require('../utils/DirectionsAPI')
var GeoFireAPI = require('../utils/GeoFireAPI')

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
		// console.log('POLYLINES: ', polylines)
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
	// console.log('getNextCoord() index: ',  simDriver.currentIndex)
	updateDriverCoord(simDriver.uid, simDriver.polyline[simDriver.currentIndex])

	if(simDriver.currentIndex < simDriver.polyline.length-1) {
		setTimeout(() => { simulateDriverOnPolyline(simDriver) }, getRandomArbitrary(50, 2000))
		simDriver.currentIndex++
	}
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function updateDriverCoord(uid, coord) {
	// console.log('getNextCoord() index: ', uid, coord.latitude, coord.longitude)
	GeoFireAPI.setDriverLocation(
		uid, 
		coord.latitude, 
		coord.longitude
	)
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

