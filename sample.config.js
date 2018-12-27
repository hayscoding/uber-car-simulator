var config = {
	development: { //Credentials used when app is not published
	    googleDirectionsAPI: {
	    	key: '', //Copy paste your Google Directions API key here
	    },
	    firebase: {
	    	//Place your Firebase web credentials here
	    	apiKey: "",
		    authDomain: "",
		    databaseURL: "",
		    projectId: "",
		    storageBucket: "",
		    messagingSenderId: ""
	    }
	},
	production: { //Credentials used after app has been published
		googleDirectionsAPI: {
	    	key: '', //Copy paste your Google Directions API key here
		},
		firebase: {
	    	//Place your Firebase web credentials here
	    	apiKey: "",
		    authDomain: "",
		    databaseURL: "",
		    projectId: "",
		    storageBucket: "",
		    messagingSenderId: ""
		}
	},
};

module.exports = config;