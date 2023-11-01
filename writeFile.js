const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'largeFile.txt');

let stream = fs.createWriteStream(file);

for(let i = 0; i < 1e6; i++) {
    stream.write('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n');
}

stream.end();