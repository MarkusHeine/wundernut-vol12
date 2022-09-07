"use strict";
const fs = require('fs');
console.log('hello');
const binary = fs.readFileSync('./assets/parchment.png');
console.log('binary', binary);
