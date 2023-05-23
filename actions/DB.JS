let mysql = require("mysql");
var dbConnection = false;
const dbConnect = () => {
  dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "102030",
    database: "pgs",
    multipleStatements: true,
  });
  try {
    dbConnection.connect();
  } catch (err) {
    dbConnection = false;
  }
};
const dbQuery = (queryString) => {
  if (dbConnection) {
    dbConnection.query(queryString, function (err) {
      if (err) {
        console.error("the problem is: " + err.message);
      } else {
        console.log("done!");
      }
    });
  } else {
    dbConnect();
  }
};
async function insertIntoTable(data) {
  dbQuery(
    `INSERT INTO data (name, phone) VALUES ('${data.name}','${data.phone}');`
  );
}
async function deleteFromTable(data) {
  dbQuery(
    `DELETE from data WHERE (name,phone)=('${data.name}','${data.phone}')`
  );
}
async function updateNameOf(data) {
  dbQuery(
    `UPDATE data SET name = '${data.name}' WHERE phone ='${data.phone}';`
  );
}
async function updatePhoneOf(data) {
  dbQuery(
    `UPDATE data SET phone = '${data.phone}' WHERE name ='${data.name}';`
  );
}

async function createTablesIfNotExist(){
  dbQuery(
    `CREATE TABLE IF NOT EXISTS data (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(20) UNIQUE,phone VARCHAR(20) UNIQUE);`
  );
}
module.exports = {
  insertIntoTable,
  deleteFromTable,
  updateNameOf,
  updatePhoneOf,
  dbConnect,
  dbQuery,
  createTablesIfNotExist
};
