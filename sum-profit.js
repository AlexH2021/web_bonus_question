const through = require("through2");

const sumProfit = () => {
    let totalPrice = 0;
    return through.obj(
        function (chunk, enc, cb) {
            totalPrice+=parseFloat(chunk.profit);
            cb();
        }, // transform is a noop
        function (cb) { // flush function
          this.push(`Total profit is: $${totalPrice.toFixed(2)}\n`);
          cb();
        }
    )
}

module.exports = {sumProfit};