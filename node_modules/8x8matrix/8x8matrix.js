var matrix = {
	
	brightness: 15,
	rpio: null,
	write_buffer: [],
	current_array: [],
	
	init: function(rpio) {
		
		this.rpio = rpio;
		
		this.rpio.i2cBegin();
		this.rpio.i2cSetSlaveAddress(0x70);
		this.rpio.i2cSetBaudRate(10000);
		
		
		// Turn on the oscillator
		this.rpio.i2cWrite(Buffer([(0x20 | 0x01)]));
		
		// Turn display on
		this.rpio.i2cWrite(Buffer([(0x01 | 0x80)]));
		
		// Initial Clear
		for (var x = 0; x < 16; x++) {
			this.rpio.i2cWrite(Buffer([x, 0]));
		}

		// Set display to full brightness.
		this.rpio.i2cWrite(Buffer([(0xE0 | matrix.brightness)]));

	},
	
	setBrightness: function(b) {
		
	},

	setLED: function(y, x, value) {
		
		var led = y * 16 + ((x + 7) % 8);
		
		var pos = Math.floor(led / 8);
		var offset = led % 8;
	
		
		if (value)
			this.write_buffer[pos] |= (1 << offset);
		else
			this.write_buffer[pos] &= ~(1 << offset);
	},
	
	writeArray:function(_array) {
	
		this.current_array = _array;
		this.clearBuffer();
		
		var x = 0;
		var y = 0;
		
		for (var i in _array) {
			this.setLED(y, x, _array[i]);
			
			x++;
			
			if (x >= 8) {
				y++;
				x = 0;
			}
			
		}
		
		this.writeBuffer();
	},
	
	writeAnimation: function(_array, speed) {
	
		var self = this;
		var old_buffer = this.write_buffer.slice();
		
		for (var i in _array) {
			self.writeAnimation2(i, _array[i], speed);
		}
		
		setTimeout(function() {
			
			self.clearBuffer();
			self.writeBuffer();
			
		}, _array.length * speed + speed);
		
		setTimeout(function() {
			
			self.write_buffer = old_buffer.slice();
			self.writeBuffer();
			
		}, _array.length * speed + 1000);
	},
	
	writeAnimation2: function(i, data, speed) {
		
		var self = this;
		
		setTimeout(function() {
			self.writeArray(data);
		}, speed * i);
	},
	
	writeBuffer: function() {
		for (var i in this.write_buffer) {
			this.rpio.i2cWrite(Buffer([i, this.write_buffer[i]]));
		}
	},
	
	clearBuffer: function() {
		for (var i in this.write_buffer) {
			this.write_buffer[i] = 0;
		}
	},
	
	smily: [
		0,0,1,1,1,1,0,0,
		0,1,0,0,0,0,1,0,
		1,0,1,0,0,1,0,1,
		1,0,0,0,0,0,0,1,
		1,0,1,0,0,1,0,1,
		1,0,0,1,1,0,0,1,
		0,1,0,0,0,0,1,0,
		0,0,1,1,1,1,0,0,
	],
}


module.exports = matrix;