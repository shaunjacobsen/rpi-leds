const rpio = require('rpio');
const matrix = require('8x8matrix');
const sleep = require('sleep-async')();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// body parser middleware
app.use(bodyParser.json());

matrix.init(rpio);

matrix.writeArray(smily);

app.post('/light', (req, res) => {});

let parseLightCommand = (command) => {
  // take each pattern object and iterate throught it, delaying it
  command.forEach((pattern) => {
    console.log(pattern.leds);
    sleep(1000);
  });
};

//[{"leds":[0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"duration":0.1}]

app.listen(3000, () => {
  console.log(`Server up on ${3000}`);
});

module.exports = { app };
