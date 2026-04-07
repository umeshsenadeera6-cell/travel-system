const fs = require('fs');
const path = require('path');

const tourDataPath = path.resolve('/Users/erangasenadeera/Developing Projects/travel-business-system/frontend/src/data/tours.js');
const seedDataPath = path.resolve('/Users/erangasenadeera/Developing Projects/travel-business-system/backend/seed.js');

function cleanTourData() {
  let content = fs.readFileSync(tourDataPath, 'utf8');
  // Remove time: "...", including trailing comma and optional space
  content = content.replace(/time:\s*".*?",\s*/g, '');
  fs.writeFileSync(tourDataPath, content);
  console.log('Cleaned tours.js');
}

function cleanSeedData() {
  let content = fs.readFileSync(seedDataPath, 'utf8');
  // Remove time: "...", including trailing comma and optional space
  content = content.replace(/time:\s*".*?",\s*/g, '');
  // Remove string time prefixes like "08:00 AM - "
  content = content.replace(/"\d{2}:\d{2} [AP]M - /g, '"');
  fs.writeFileSync(seedDataPath, content);
  console.log('Cleaned seed.js');
}

cleanTourData();
cleanSeedData();
