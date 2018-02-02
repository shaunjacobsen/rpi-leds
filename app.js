const rpio = require('rpio');
const matrix = require('8x8matrix');
const delay = require('delay');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
// body parser middleware
app.use(bodyParser.json());

matrix.init(rpio);

//matrix.writeArray(smily);

app.post('/light', (req, res) => {
  console.log(req.body);
  parseLightCommand(req.body.commands, req.body.loop);
  res.status(200).send();
});

let writeToMatrix = (pattern) => {
  matrix.clear()
}

let parseLightCommand = (command, loop) => {
  console.log('command', command);
  matrix.writeAnimation(command, 50);
  // take each pattern object and iterate throught it, delaying it
  //command.forEach((pattern) => {
  //  console.log(pattern.leds);
  //  matrix.writeArray(pattern.leds));
  //});
//    var iterations = command.length;
//    for(var i = 1; i < iterations; i++) {
//      (function(i) {
//        setTimeout(function(){
//          matrix.writeArray(command[i].leds);
//        }, parseFloat(command[i].duration) * 1000)
//      })(i);
//    }
};

//[{"leds":[0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"duration":0.1}]

app.listen(3000, () => {
  console.log(`Server up on ${3000}`);
});

module.exports = { app };
