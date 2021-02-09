const mysql = require("mysql");
const config =  require('./config.json')
let db = null;

const connect = async () => {

  db = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
  });

  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) reject(err);
      resolve(db);
    });
  });
};

const query = (sqlQuery) => {
  return new Promise(async (resolve, reject) => {
    if (!db)
      reject(
        'Connect to db first with `require("./mysql").connect()`'
      );

    db.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Not rejecting the errors because the control
// should not go in catch block in lambda function
// which may result in network err in response object.
const end = () => {
  return new Promise((resolve) => {
    if (!db) return resolve("DB was not connected");
    db.end((err) => {
      if (err) return resolve(err);
      resolve("Db disconnected");
    });
  });
};

exports.connect = connect;
exports.query = query;
exports.end = end;
