const through = require("through2");

const filterByCountry = (country) => {
    return through.obj(function (buf, enc, next) {
        if(buf.country !== null && buf.country === country){
            this.push(buf);
        }

        next();
    });
}

module.exports = {filterByCountry};