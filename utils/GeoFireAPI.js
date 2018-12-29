/*
<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
----------------------------------------------------------------
    Author: Hays Stanford
    Website: www.haysstanford.com
    Github: github.com/HaysS
    Twitter: twitter.com/thehaysstanford
----------------------------------------------------------------
<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
*/

import firebase from 'firebase'
import GeoFire from 'geofire'
import { Location } from 'expo'

import * as FirebaseAPI from './FirebaseAPI'

const OPTIONS = {
	enableHighAccuracy: true,
	timeInterval: 100000,
	distanceInterval: 3000,
}

/*
#######################################################
--------------     DATABASE FUNCTIONS    --------------
#######################################################
*/

export const watchLocation =  (uid) => {
	console.log('watchLocation()')
	return Location.watchPositionAsync(OPTIONS, (pos) => {
		setUserLocation(uid, pos.coords.latitude, pos.coords.longitude)
	})
}

export const setUserLocation = (uid, lat, lon) => {
	console.log('setUserCoord()')
	const firebaseRef = firebase.database().ref()
	const geoFire = new GeoFire(firebaseRef.child('users/'+uid))

	geoFire.set('location', [lat, lon]) //refactor this to function
		.then(() => {
			console.log("Key has been added to GeoFire");
		}, (error) => {
			console.log("Error: " + error);
		}
	)
}

export const setDriverLocation = (uid, lat, lon) => {
	console.log('setDriverLocation()')
	const firebaseRef = firebase.database().ref()
	const geoFire = new GeoFire(firebaseRef.child('drivers/'))

	geoFire.set('location', [lat, lon]) //refactor this to function
		.then(() => {
			console.log("Key has been added to GeoFire");
		}, (error) => {
			console.log("Error: " + error);
		}
	)
}

export const getMarkerLocation = (uid, cb) => {
	const firebaseRef = firebase.database().ref()
	const geoFire = new GeoFire(firebaseRef.child('drivers/'))

	geoFire.get(uid).then((location) => {
		if(location != null)
			cb(location)
		else
			console.log('location not found.')
	})
}

export const getUserLocation = (uid, cb) => {
	console.log('get user location called')

	FirebaseAPI.getUser(uid, (user) => {
		if(user.location)
			cb(user.location.l)
		else
			console.log('cannot find user coord')
	})
}


/*
#######################################################
--------------      QUERY FUNCTIONS      --------------
#######################################################
// */ 

const newDriver = (key, location) => {
	// console.log('new driver: ', key, location[0], location[1])
	const driver = {
		uid: key,
		location: {
			latitude: location[0],
			longitude: location[1],
		},
	}

	return driver
}

export const setReadyRegistration = (geoQuery) => {
	geoQuery.on("ready", function() {
		console.log("GeoQuery has loaded and fired all other events for initial data");
	});
}

export const setKeyEnteredRegistration = (geoQuery, cb) => {
	geoQuery.on("key_entered", function(key, location, distance) {
		console.log(key + " entered query at " + location + " (" + distance + " km from center)");
		const driver = newDriver(key, location)
		cb(driver)
	});
}

export const setKeyMovedRegistration = (geoQuery, cb) => {
	geoQuery.on("key_moved", function(key, location, distance) {
		console.log(key + " moved within query to " + location + " (" + distance + " km from center)");
		const driver = newDriver(key, location)
		cb(driver)
	});
}

export const setKeyExitedRegistration = (geoQuery, cb) => {
	geoQuery.on("key_exited", function(key, location, distance) {
		console.log(key + " exited query to " + location + " (" + distance + " km from center)");
		const driver = newDriver(key, location)
		cb(driver)
	});
}

export const cancelGeoQuery = (geoQuery) => {
	geoQuery.cancel()
}

export const getGeoQuery = (uid, cb) => {
	const firebaseRef = firebase.database().ref()
	const geoFire = new GeoFire(firebaseRef.child('drivers'))

	console.log('getGeoQuery called')

	getUserLocation(uid, (location) => {
		const geoQuery = geoFire.query({
			center: location,
			radius: 10.5
		})

		cb(geoQuery)
	})
}