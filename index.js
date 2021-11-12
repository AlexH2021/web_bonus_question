const {
    createReadStream, createWriteStream
} = require("fs");
const { pipeline } = require('stream');
const parse = require("csv-parse");
const {createGunzip} = require("zlib");
const {filterByCountry} = require("./filter-by-country.js");
const {sumProfit} = require("./sum-profit.js");

const csvParser = parse({columns: true});
const [,, src, dest] = process.argv;
const gunzipStream = createGunzip();
const srcStream = createReadStream(src);
const destStream = createWriteStream(dest);

// srcStream
//     .pipe(gunzipStream)
//     .pipe(csvParser)
//     .pipe(filterByCountry('Italy'))
//     .pipe(sumProfit())
//     .pipe(destStream)
//     .pipe(process.stdout);

pipeline(
    srcStream,
    gunzipStream,
    csvParser,
    filterByCountry('Italy'),
    sumProfit(),
    // destStream,
    process.stdout,
    (err) => {
        if(err) {
            console.error(`Error: ${err}`);
            process.exit(1);
        }
        console.log("Done!");
    }
)