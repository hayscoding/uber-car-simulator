//Iterates through all polylines & returns an array of the 1st coordinate for each polyline
getCoordinateFromPolylines(polylines) {
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

animateMarkerThruCoords(index, coords) {
// console.log('INDEX: ', index)
// var nextCoords = coords
// nextCoords = nextCoords.slice(1, nextCoords.length) //remove first elem
// console.log('ANIMATE MARKER THRU() COORDS: ', index, coords, '\nNextCoords: ', coords.slice(1, coords.length)) //remove first elem)

// if(coords.length != 0)
// console.log('Coords: ', coords)
if(coords.length != 0){
this.updateMarkerBearing(index, this.getBearing(coords[0], coords[1]))

this.animateMarker(index, coords[0], () => { this.animateMarkerThruCoords(index, coords.slice(1, coords.length)) })
}
else 
this.animateMarkerThruCoords(index, this.state.polylines[index])
}

animateThruCoords(coords) {
var nextCoords = coords
nextCoords = nextCoords.slice(1, nextCoords.length) //remove first elem
// console.log('COORDS LENGTH: ', coords.length, 'NEXT COORDS LENGTH: ', nextCoords.length)

if(coords.length != 0)
this.animate(coords[0], () => { this.animateThruCoords(nextCoords) })
}

startAnimation() {
if(this.state.route != null) {
console.log('STARTANIMATION() ROUTE: ', this.state.route.length, '\nFIRST COORD: ', this.state.route[0])
this.animateThruCoords(0, this.state.route)
}
}


animateMarker(index, coord, cb) {
// console.log('animateMarker', coord)
const nextCoord = {
latitude: coord.latitude,
longitude: coord.longitude
};

this.state.markerCoordinates[index].timing(nextCoord).start(() => { cb() });
}

startMarkerAnimation() {
// console.log('START MARKER ANIMATIONS(): ', index, route)
if(!this.state.animating){
this.animateMarkersThruCoords()
this.setState({animating: true})
}
}

startAnimation() {
if(this.state.route != null) {
console.log('STARTANIMATION() ROUTE: ', this.state.route.length, '\nFIRST COORD: ', this.state.route[0])
this.animateThruCoords(0, this.state.route)
}
}