const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS responses (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        s_id VARCHAR(50),
        onPage VARCHAR(20),
        name VARCHAR(50),
        email VARCHAR(50),
        password VARCHAR(50),
        address_line1 VARCHAR(100),
        address_line2 VARCHAR(100),
        city VARCHAR(50),
        state VARCHAR(2),
        zipcode VARCHAR(5),
        phone VARCHAR(10),
        credit_number VARCHAR(16),
        cvv VARCHAR(4),
        expiry_date VARCHAR(4),
        billing_zip VARCHAR(5)
        )`
    )
  )
  .catch((err) => console.log(err));

db.addSession = (session_id) => {
  return db.connectAsync()
    .then(() => {
      db.queryAsync('SELECT s_id FROM responses')
        .then((queryData) => {
          return queryData[0];
        })
        .then((results) => {
          results = results.map(result => result.s_id);
          if (!results.includes(session_id)) {
            console.log(session_id);
            return db.queryAsync(
              `INSERT INTO responses (s_id, onPage)
              VALUES (?, 'home')`,
              [session_id]
            )
          }
          return;
        })
    })
    .catch(err => console.log(err));
}

db.getCustomer = (session_id) => {
  return db.connectAsync()
    .then(() => {
      return db.queryAsync(`SELECT * FROM responses WHERE s_id = ?`, [session_id]);
    })
    .then((results) => {
      return results[0][0];
    });
}

db.updateLogin = (updateInfo) => {
  return db.connectAsync()
    .then(() => {
      return db.queryAsync(`UPDATE responses
        SET name = ?, email = ?, password = ?
        WHERE s_id = ?`,
        [updateInfo.name, updateInfo.email, updateInfo.password, updateInfo.s_id]);
    })
}

db.updateAddress = (updateInfo) => {
  return db.connectAsync()
    .then(() => {
      return db.queryAsync(`UPDATE responses
        SET address_line1 = ?, address_line2 = ?, city = ?, state = ?, zipcode = ?, phone = ?
        WHERE s_id = ?`,
        [updateInfo.address_line1, updateInfo.address_line2, updateInfo.city, updateInfo.state,
          updateInfo.zipcode, updateInfo.phone, updateInfo.s_id]);
    })
};

db.updateBilling = (updateInfo) => {
  return db.connectAsync()
    .then(() => {
      return db.queryAsync(`UPDATE responses
        SET credit_number = ?, cvv = ?, expiry_date = ?, billing_zip = ?
        WHERE s_id = ?`,
        [updateInfo.credit_number, updateInfo.cvv, updateInfo.expiry_date,
          updateInfo.billing_zip, updateInfo.s_id]);
    })
}

module.exports = db;
