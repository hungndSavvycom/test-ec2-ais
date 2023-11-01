const axios = require('axios')
const fs = require('fs')

const csvFilePath = 'output-previous.csv';
const csvReportPath = 'REPORT.csv';
const endPoint = 'https://beehive-frame-finder-f6i4ayd3wa-ts.a.run.app/image/downloader';

const sendRequests = async (urls) => {
	console.log('Start import images');

	for (const imageUrl of urls) {
		console.log('Start import image', imageUrl);
		try {
			const response = await axios.post(endPoint, {
				imageUrl,
			});
			writeCSVFile([
				`"${imageUrl}"`,
				'Pass',
				JSON.stringify(response.data.status),
			]);
		} catch (error) {
			console.log('Error import image', imageUrl);
			writeCSVFile([`"${imageUrl}"`, 'Failed', JSON.stringify(error)]);
		}
	}
};

// Function to read a CSV file and return its content as an array of objects
const readCSVFile = (filePath) => {
	return new Promise((resolve, reject) => {
		const data= [];

		fs.createReadStream(filePath)
			.on('data', (chunk) => {
				const lines = chunk.toString().split('\n');

				for (const line of lines) {
					data.push(line.split(',')[0]);
				}
			})
			.on('end', () => {
				resolve(data);
			})
			.on('error', (error) => {
				reject(error);
			});
	});
};

const writeCSVFile = (data) => {
	console.log('Write CSV files');

	fs.access(csvReportPath, fs.constants.F_OK, (err) => {
		if (err) {
			// The file doesn't exist, so create it and append data
			const headers = ['url', 'statusRequest', 'status'];
			let csvData = headers.join(',') + '\n';
			csvData += data.join(',') + '\n';
			fs.writeFile(csvReportPath, csvData, (err) => {
				if (err) {
					console.error('Error writing CSV file:', err);
				} else {
					console.log('CSV file saved:', csvReportPath);
				}
			});
		} else {
			let csvData = data.join(',') + '\n';
			fs.appendFile(csvReportPath, csvData, 'utf8', (appendErr) => {
				if (appendErr) {
					console.error(
						'Error appending data to CSV file:',
						appendErr
					);
					return;
				}
				console.log('Data appended to CSV file successfully.');
			});
		}
	});
};

readCSVFile(csvFilePath)
	.then((dataArray) => {
		sendRequests(dataArray);
	})
	.catch((error) => {
		console.error('Error reading CSV file:', error);
	});

// sendRequests([
// 	'https://cdn.mos.cms.futurecdn.net/6mS9bHomc4Di38HTSn6kef-1920-80.jpg',
// 	'https://www.who.com.au/media/93352/team-guy-the-voice-2023.png?width=720&center=0.0,0.0',
// ]);
