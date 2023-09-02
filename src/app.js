const fs = require('fs');

const sourceStream = fs.createReadStream('source.txt');
const destinationStream = fs.createWriteStream('destination.txt');

sourceStream.pipe(destinationStream);

sourceStream.on('end', () => {
  console.log('Copying complete.');
});