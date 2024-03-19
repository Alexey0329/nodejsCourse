import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import csv from 'csvtojson'

import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, 'csv', 'data.csv');
const txtFilePath = path.join(__dirname, 'outputCSV2TXT.txt');


const rl = readline.createInterface({
  input: fs.createReadStream(csvFilePath),
});

let isFirstLine = true;

rl.on('line', (line) => {
  if (isFirstLine) {
    isFirstLine = false;
    return;
  }
  csv({noheader:true, output:"line"})
  .fromString(line)
  .then((csvLine)=>{ 
    const [book, author, quantity, price] = csvLine[0].split(',')
    fs.appendFile(txtFilePath, `{"book":"${book}","author":"${author}","price":${price}}\n`, (err) => {
      if (err) console.error(err);
    });
  })
});

rl.on('close', () => {
  console.log('Finished reading the file.');
});

rl.on('error', (err)=> {
  console.log(err.stack);
});

