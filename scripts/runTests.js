const cypress = require('cypress');
const fs = require('fs');
const AsciiTable = require("ascii-table");

cypress
  .run({
    spec: './cypress/integration/API/**/*',
    reporter: "mocha-multi-reporters",
    reporterOptions: {
      configFile: "reporterConfig.json"
    },
  }).then(results => {
    //   console.log(JSON.stringify(results));
      var table = new AsciiTable('🚀');
      table.setHeading('', 'Spec', 'Passed', 'Failed', 'Duration(sec)');
      results.runs.forEach((item, index) => {
          table.addRow(index + 1, item.spec.name, item.stats.passes, item.stats.failures, (item.stats.wallClockDuration/1000).toFixed(2));
      }); 
      const resultText = `${table.toString()}\nTotal: ${results.totalTests} Tests, ${results.totalPassed} Passed 😎, ${results.totalFailed} Failed 💩`;
      fs.writeFile('report/results.txt', resultText, function (err) {
          if (err) {
              return console.log(err);
          }
          console.log("Result file was saved!");
      }); 
  });