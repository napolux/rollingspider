'use strict';

var keypress 	  = require('keypress');
var RollingSpider = require('rolling-spider');
var colors 		  = require('colors');

// Hello World! :D
console.log('***** PARROT PILOT *****'.yellow);

// Make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// Listening for the "keypress" event
process.stdin.on('keypress', function (ch, key) {

	// Takeoff...
	if (key && key.name == 't') {
		console.log('[INFO] Take-off and stabilization...'.green);

		try {

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

		} catch(err) {
			console.log('[ERROR] '.red + err.red);
		}

		process.exit();
	};	

	if (key && key.name == 'l') {
		// A normal landing...
		console.log('[INFO] Landing...'.green);

		try {

		} catch(err) {
			console.log('[ERROR] '.red + err.red);
		}
	}

	if (key && key.name == 'x') {
		// Landing drone and exiting...
		console.log('[INFO] Landing...'.green);

		try {

		} catch(err) {
			console.log('[ERROR] '.red + err.red);
		}

		console.log('***** GOODBYE! *****'.rainbow);
		process.exit();
	}
});

process.stdin.setRawMode(true);
process.stdin.resume();