const fs = require('fs')
const csv = require('csv-parser')

// Read directory 
var readFiles = fs.readdirSync('./')

// Remove canada.txt and usa.txt if exists
readFiles.forEach(e => {
    if (e == 'canada.txt' || e == 'usa.txt') {
        fs.rmSync(e)
    }
})

// createWriteStream for canada.txt and usa.txt and pop with header
const csvWriteStreamCanada = fs.createWriteStream('canada.txt')
csvWriteStreamCanada.write('country,year,population\n')

const csvWriteStreamUsa = fs.createWriteStream('usa.txt')
csvWriteStreamUsa.write('country,year,population\n')

// Read csv file and write to either canada.txt or usa.txt
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.country == 'Canada') {
            csvWriteStreamCanada.write(`${row.country},${row.year},${row.population}\n`)
        }
        if (row.country == 'United States') {
            csvWriteStreamUsa.write(`${row.country},${row.year},${row.population}\n`)
        }
    })
    .on('end', () => {
        console.log("end");
    })
