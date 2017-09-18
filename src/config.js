import Dimensions from 'Dimensions';

const window = Dimensions.get('window');

/* Setup ==================================================================== */
exports.title = 'GlobalConfig';

export default {
	// App Details
	appName: 'GOC',

	// Window Dimensions
	windowHeight: window.height,
	windowWidth: window.width,

	// Grid
	windowWidthHalf: window.width * 0.5,
	windowWidthYhird: window.width * 0.333,
	windowWidthYwoThirds: window.width * 0.666,
	windowWidthQuarter: window.width * 0.25,
	windowWidthThreeQuarters: window.width * 0.75,

	// General Element Dimensions
	navbarHeight: 64,
	statusBarHeight: 22,

	// Fonts
	baseFontSize: 14,

	// Colors
	primaryColor: '#a5904e',
	headerColor: '#4d4d4d',
	// primaryColor: "#4099FF",
	secondaryColor: '#FFE229',
	textColor: '#555',
	borderColor: '#E7E7E7',

	// Firebase
	firebaseConfig: {
		apiKey: 'AIzaSyC5FN_4EfqAcIoPOOVzTXeze-afOVS_YZo',
		authDomain: 'goc-app-6efe2.firebaseapp.com',
		databaseURL: 'https://goc-app-6efe2.firebaseio.com',
		storageBucket: 'goc-app-6efe2.appspot.com',
		messagingSenderId: '44635103582'
	}
};
