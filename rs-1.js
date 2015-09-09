'use strict';

var keypress 	  = require('keypress');
var RollingSpider = require('rolling-spider');
var colors 		  = require('colors');

var uuid = 'ff5af834737b41e6afd3a66260315f86';

// Hello World! :D
console.log('***** PARROT PILOT *****'.yellow);

// Make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// Connecting to drone...
var rs = new RollingSpider({'uuid': uuid});

// NEW CODE BELOW HERE

rs.connect(function() {

	console.log('[INFO] Connecting to: '.green + uuid.green);

  	rs.setup(function() {
  			console.log('[INFO] Connected to: '.green + uuid.green);
  	});
});

// Listening for the "keypress" event
process.stdin.on('keypress', function (ch, key) {

	// Takeoff...
	if (key && key.name == 't') {
		console.log('[INFO] Take-off and stabilization...'.green);

		try {
          rs.takeOff();
          rs.flatTrim(function() {
          	console.log('[INFO] Rolling Spider is stable'.green);
          });
   		} catch(err) {
			console.log('[ERROR] '.red + err.red);
		}
	};	

	// Process flightplan
	if(key && key.name == 'f') {
		console.log('[INFO] We have a plan... Let\'s fly!'.green);		

		try {

		} catch(err) {
			console.log('[ERROR] '.red + err.red);
		}
	}

	// Emergency landing...
	if (key && key.name == 'e') {
		console.log('[INFO] Emergency landing!'.red);

		try {
			rs.emergency();
		} catch(err) {
			console.log('[ERROR] '.red + err.red);
		}

		process.exit();
	};	

	if (key && key.name == 'l') {
		// A normal landing...
		console.log('[INFO] Landing...'.green);

		try {
			rs.land();
		} catch(err) {
			console.log('[ERROR] '.red + err.red);
		}
	}

	if (key && key.name == 'x') {
		// Landing drone and exiting...
		console.log('[INFO] Landing...'.green);

		try {
			rs.disconnect();
		} catch(err) {
			console.log('[ERROR] '.red + err.red);
		}

		console.log('***** GOODBYE! *****'.rainbow);
		process.exit();
	}
});

process.stdin.setRawMode(true);
process.stdin.resume();