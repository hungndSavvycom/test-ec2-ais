'use strict';
const fs = require('fs');

// Read the JSON file containing the creative image URLs
const jsonFile = 'image-100.json';

fs.promises.readFile(jsonFile, 'utf-8')
  .then(async (data) => {
    const creativeImageUrls = JSON.parse(data);

    // Define the endpoint and headers
    const endpoint = 'http://localhost:3005/image/downloader';
    const headers = {
      'Content-Type': 'application/json',
    };

    // Loop through each creative image URL and make a POST request
    for(let i = 0; i < creativeImageUrls.length; i++){
        console.log("🚀 ~ file: frame-finder-excute.js:19 ~ creativeImageUrls.forEach ~ item:", item)
        const requestBody = {
          imageUrl: item.creativeImageUrl,
        };
  
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
          });
  
          if (response.ok) {
            const result = await response.json();
            console.log(`Image downloaded for ${item.creativeImageUrl}`);
            console.log(result);
          } else {
            console.error(`Failed to download image for ${item.creativeImageUrl}`);
            console.error(`Status: ${response.status}`);
            console.error(await response.text());
          }
        } catch (error) {
          console.error(`Error for ${item.creativeImageUrl}: ${error.message}`);
        }
    }

  })
  .catch((err) => {
    console.error(`Error reading the JSON file: ${err.message}`);
  });