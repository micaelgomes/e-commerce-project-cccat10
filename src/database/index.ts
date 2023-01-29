const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('../../__sqlite3__/data.db');

export {
  database as db
}
