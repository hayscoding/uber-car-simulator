var config = require('../config');

const apiKey = config.googleDirectionsAPI.key

const routesNearHome = [
	{
		origin: '3101 Guadalupe St, Austin, TX 78705',
		destination: '306 W 38TH ST, AUSTIN, TX 78705'
	},
	{
		origin: '4001 N Lamar Blvd, Austin, TX 78756',
		destination: '10901 N Lamar Blvd G, Austin, TX 78753'
	},
	{
		origin: '3909 Guadalupe St, Austin, TX 78751',
		destination: '1000 E 41st St, Austin, TX 78751'
	},
	{
		origin: '3515 N Lamar Blvd, Austin, TX 78705',
		destination: '2819 Guadalupe St, Austin, TX 78705'
	},
	// {
	// 	origin: '3110 Guadalupe St suite #400, Austin, TX 78705',
	// 	destination: '3303 N Lamar Blvd, Austin, TX 78705'
	// },
	{
		origin: '1000 E 41st St, Austin, TX 78751',
		destination: '3009 Guadalupe St, Austin, TX 78705'
	},
	{
		origin: '3110 Windsor Rd, Austin, TX 78703',
		destination: '1106 W 38th St, Austin, TX 78705'
	},
]

exports.getSimulatorPolylines = getSimulatorPolylines

//Returns the coordinates for the each route located in the routesNearHome array
async function getSimulatorPolylines(cb) {
	console.log('getSimulatorPolylines called ')

	const routes = formatRouteAddresses(routesNearHome)
	var polylines = []

	for(var i = 0; i < routes.length; i++)
		await getDirections(routes[i].origin, routes[i].destination, (coords) => {
			polylines.push(coords)
		})

	cb(polylines)
}

const iterateThruRoute = (routes) => {
  const nextRoutes = routes.slice(1, routes.length) //remove first elem

  if(coords.length != 0)
      this.animate(coords[0], () => { this.animateThruCoords(nextCoords) })
}

const getDirections = (origin, destination, cb) => {
	return fetch('https://maps.googleapis.com/maps/api/directions/json?origin='+origin+'&destination='+destination+'&key='+apiKey)
		.then((res) => res.json())
		.then((resJson) => {
			var polylineCoords = null;

			if (resJson.routes.length)
      			polylineCoords = decode(resJson.routes[0].overview_polyline.points)
      		else
      			console.log(resJson.error_message, resJson.status)

			// console.log('==================================')
			// console.log('Origin: ', origin, 'destination: ', destination)
			// console.log('Polylines: ', polylineCoords)
			// // console.log('JSON Data: ', resJson)
			// console.log('==================================')

			cb(polylineCoords)
		})
		.catch((err) => {
			console.error(err)
		})
}


const formatRouteAddresses = (routes) => {
	var formattedRoutes = []

	routes.forEach((route) => {
		formattedRoutes.push({ origin: formatAddress(route.origin), destination: formatAddress(route.destination) })
	})

	return formattedRoutes
}	

//Replaces commas and spaces with '+' signs
const formatAddress = (address) => {
	var formattedAddress = address.split(',').join('').split(' ').join('+')

	return formattedAddress
}

const disneylandDirections = (cb) => {
	fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key='+apiKey)
		.then((res) => res.json())
		.then((resJson) => {
			var polylineCoords = null;

			if (resJson.routes.length)
		        polylineCoords = decode(resJson.routes[0].overview_polyline.points)

	      	cb(polylineCoords)
		})
		.catch((err) => {
			console.error(err)
		})
}

const getExamplePolyline = (cb) => {
	const origin = '306+W+38TH+ST+AUSTIN+TX'
	const destination="Kerbey+Lane+Cafe"

	fetch('https://maps.googleapis.com/maps/api/directions/json?origin='+origin+'&destination='+destination+'&key='+apiKey)
		.then((res) => res.json())
		.then((resJson) => {
			var polylineCoords = null;

			if (resJson.routes.length)
      	polylineCoords = decode(resJson.routes[0].overview_polyline.points)

      // console.log('POLYLINE COORDS: ', polylineCoords)

    	cb(polylineCoords)
		})
		.catch((err) => {
			console.error(err)
		})
}

//Decodes encoded polyline strings returned from the Google Directions API
//Can find source at this url: https://github.com/react-native-community/react-native-maps/issues/929#issuecomment-271365235
const decode = (t,e) => {
	for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
}
