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
	if (key.name == 't') {
		console.log('Take-off and stabilization...'.green);
	};	

	// Process flightplan
	if(key.name == 'f') {
		console.log('We have a plan... Let\'s fly!'.green);		
	}

	// Emergency landing...
	if (key.name == 'e') {
		console.log('Emergency landing!'.red);
		process.exit();
	};	

	if (key.name == 'l') {
		// A normal landing...
		console.log('Landing...'.green);
	}

	if (key.name == 'x') {
		// Landing drone and exiting...
		console.log('Landing...'.green);
		console.log('Goodbye!'.rainbow);
		process.exit();
	}
});

process.stdin.setRawMode(true);
process.stdin.resume();