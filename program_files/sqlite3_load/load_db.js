const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./sqlite3_load/init_app.db";

function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE migration
  (
    _id	       VARCHAR(64),
    firstname	 VARCHAR(64),
    lastname	 VARCHAR(64),
    fullname	 VARCHAR(64),
    diachi	 VARCHAR(1024),
    street_addr	 VARCHAR(1024),
    city	 VARCHAR(1024),
    state_province	 VARCHAR(1024),
    postal_zipcode	 VARCHAR(1024),
    country	 VARCHAR(1024),
    sodienthoai	 VARCHAR(64),
    email	   VARCHAR(64),
    congty	 VARCHAR(1024),
    session	   VARCHAR(64),
    cookie	   VARCHAR(64),
    uid	   VARCHAR(128),
    username	        VARCHAR(128),
    password	        VARCHAR(128),
    serecpin	        VARCHAR(128),
    sereckey	        VARCHAR(128),
    bio	 VARCHAR(1024),
    lienket	 VARCHAR(1024),
    sub_domain              VARCHAR(1024),
    ext_path              VARCHAR(128),
    ext_log              VARCHAR(2048),
    tieu_de              VARCHAR(64),
    mo_ta              VARCHAR(64),
    link_hinh              VARCHAR(2048),
    type_display              VARCHAR(64),
    ext_id         INT
  )
`);
}

module.exports = connectToDatabase();


