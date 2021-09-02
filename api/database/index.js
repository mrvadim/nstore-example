const initOptions = {
  noWarnings: false,
  // connect: (client, dc, useCount) => {
  //   const cp = client.connectionParameters;
  //   console.log("\x1b[32m", "--Connected to database:", "\x1b[0m", cp.database);
  // console.log("\x1b[33m%s\x1b[0m", "yellow");
  // console.log("\x1b[31m%s\x1b[0m", "red");
  // console.log("\x1b[32m%s\x1b[0m", "green");
  // console.log("\x1b[36m", "sometext", "\x1b[0m", "somemoretext");
  // },
  // query(e) {
  //   console.log("QUERY:", e.query);
  // },
  // disconnect: (client, dc) => {
  //   const cp = client.connectionParameters;
  //   console.log(
  //     "\x1b[32m",
  //     "--Disconnecting from database:",
  //     "\x1b[0m",
  //     cp.database
  //   );
  // },
  error: (error, e) => {
    if (e.cn) {
      console.error("CN:", e.cn);
      console.error("EVENT:", error.message || error);
    }
  }
};

const pgp = require("pg-promise")(initOptions);
const cn = {
  host: process.env.PGHOST || "127.0.0.1",
  port: process.env.PGPORT || 5555,
  database: process.env.PGDATABASE || "nstore",
  user: process.env.PGUSER || "pguser",
  password: process.env.PGPASSWORD || ""
};

const db = pgp(cn);

db.connect()
  .then(function(obj) {
    const serverVersion = obj.client.serverVersion;
    console.log("version: ", serverVersion);
    obj.done(); // success, release connection;
  })
  .catch(function(error) {
    console.log("ERROR:", error.message);
  });

module.exports = db;
