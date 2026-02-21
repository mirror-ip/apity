/**
 * APITY: APITY Web Sevices.
 *
 * @copyright Copyright (c) 2026, Hoàng Hải <leduchoanghai@yahoo.com>
 * @license   MIT, http://www.opensource.org/licenses/mit-license.php
 */


const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("./load_db");

fs.createReadStream("./raw_db.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    db.serialize(function () {
      db.run(
        `INSERT INTO migration VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11]],
        function (error) {
          if (error) {
            return console.log(error.message);
          }
          console.log(`Inserted a row with the id: ${this.lastID}`);
        }
      );
    });
  });

