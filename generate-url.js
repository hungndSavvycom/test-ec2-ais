const fs = require('fs');

const jsonData = JSON.parse(fs.readFileSync('image-100.json', 'utf8'));

const headers = Object.keys(jsonData[0]);

let csvData = headers.join(',') + '\n';

jsonData.forEach((obj) => {
	const values = headers.map((header) => obj[header]);
	csvData += values.join(',') + '\n';
});

fs.writeFileSync('output-previous.csv', csvData);

console.log('CSV file has been written successfully');
