function loopThruPolyline(polyline, cb) {

}

function runSimulation(simDrivers) {
    simDrivers.forEach((simDriver) => {
        simulateDriverOnPolyline(simDriver.uid, simDriver.polyline)
    })
}

function updateDriverLocation(uid, coord) {

}

function simulateDriverOnPolyline(uid, polyline) {
    loopThruPolyline(polyline, (coord) => {
        updateDriverLocation(uid, coord)
    })
}


function getPolyline(index) {

}

//Iterates through all polylines & returns an array of the 1st coordinate for each polyline
export function getCoordinateFromPolylines(polylines) {
    var coordinates = []

    polylines.forEach((polyline) => {
        coordinates.push(new MapView.AnimatedRegion({
            latitude: polyline[0].latitude,
            longitude: polyline[0].longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
        }))
    })

    // console.log('setCoords return: ', coordinates)
    return coordinates
}

export function animateThruCoords(coords) {
    var nextCoords = coords
    nextCoords = nextCoords.slice(1, nextCoords.length) //remove first elem
    // console.log('COORDS LENGTH: ', coords.length, 'NEXT COORDS LENGTH: ', nextCoords.length)

    if(coords.length != 0)
        animate(coords[0], () => { animateThruCoords(nextCoords) })
}
