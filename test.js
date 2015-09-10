// uuid = 'ff5af834737b41e6afd3a66260315f86';

'use strict';

var keypress    = require('keypress');
var Drone       = require('rolling-spider');
var colors      = require('colors');

// Change this with your drone name...
var DRONE_NAME  = 'RS_W259332'; 


var ACTIVE = true;
var STEPS = 4;


function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, STEPS * 12);
}

// Setup...
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// call "node test.js debug" to print out debug...
if (typeof(process.argv[2]) != 'undefined') {
    var d = new Drone({'logger': console.log}); 
} else {
    var d = new Drone(); 
}

d.connect(function () {
    d.setup(function () {
        console.log('[INFO] Connected to:'.green, d.name.green);

        if(d.name != DRONE_NAME) {
            console.log('[ERROR] Connected to the wrong drone: '.red + d.name.red);
            console.log('[ERROR] Goodbye!'.red);
            try {
                d.disconnect();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }

            console.log('***** GOODBYE! *****'.rainbow);
            process.exit();
        }

        // Initial ping...
        d.flatTrim();
        d.startPing();
        d.flatTrim();

        d.on('battery', function () {
            if(+d.status.battery <= 20) {
                console.log('[WARNING] Battery low: '.red + d.status.battery.toString().red + '%'.red);
            }
        });

        setTimeout(function () {
            console.log('[INFO] Ready to fly'.green);
            ACTIVE = true;
        }, 1000);
    });
});

process.stdin.on('keypress', function (ch, key) {
    if (ACTIVE && key) {
        
        // Takeoff
        if (key.name === 't') {
            try {
                d.takeOff(function() {
                    console.log('[INFO] Rolling Spider take-off completed'.green);
                });
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        };  
        
        // Landing
        if (key.name === 'l') {
            console.log('[INFO] Landing...'.green);

            try {
                d.land();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        }

        // WASD...
        if (key.name === 'w') {
            try { 
                d.forward({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        if (key.name === 'a') {
            try { 
                d.tiltLeft({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        if (key.name === 's') {
            try {
                d.backward({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        if (key.name === 'd') {
            try { 
                d.tiltRight({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        // Up, Down, Left, Right...
        if (key.name === 'up') {
            try { 
                d.up({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        if (key.name === 'down') {
            try { 
                d.down({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        if (key.name === 'left') {
            try { 
                d.turnLeft({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        if (key.name === 'right') {
            try { 
                d.turnRight({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        }    

        // Flips (z = front, x = back, c = left, v = right)     
        if (key.name === 'z') {
            try { 
                d.frontFlip({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        }

        if (key.name === 'x') {
            try { 
                d.backFlip({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        if (key.name === 'c') {
            try { 
                d.leftFlip({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        if (key.name === 'v') {
            try { 
                d.rightFlip({ steps: STEPS });
                cooldown();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }
        } 

        // Exit...
        if (key.name === 'x') {
            try {
                d.disconnect();
            } catch(err) {
                console.log('[ERROR] '.red + err.red);
            }

            console.log('***** GOODBYE! *****'.rainbow);
            process.exit();
        }
    }
});