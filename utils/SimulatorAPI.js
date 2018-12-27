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
        this.animate(coords[0], () => { this.animateThruCoords(nextCoords) })
}

export function startAnimation() {
    if(this.state.route != null) {
        console.log('STARTANIMATION() ROUTE: ', this.state.route.length, '\nFIRST COORD: ', this.state.route[0])
        this.animateThruCoords(0, this.state.route)
    }
}


export function animateMarker(index, coord, cb) {
    // console.log('animateMarker', coord)
    const nextCoord = {
        latitude: coord.latitude,
        longitude: coord.longitude,
    };

    this.state.markerCoordinates[index].timing(nextCoord).start(() => { cb() });
}

export function startAnimation() {
    if(this.state.route != null) {
        console.log('STARTANIMATION() ROUTE: ', this.state.route.length, '\nFIRST COORD: ', this.state.route[0])
        this.animateThruCoords(0, this.state.route)
    }
}