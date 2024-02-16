const fs = require('fs');

// Load the JSON file
const rawData = fs.readFileSync('swagger.json');
const data = JSON.parse(rawData);

// Extract URLs from the "paths" key
const urls = Object.keys(data.paths);

// Write URLs to a text file
fs.writeFileSync('urls.txt', urls.join('\n'));

console.log("URLs extracted and saved to 'urls.txt' file.");
