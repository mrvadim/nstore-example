const db = require("../database");
module.exports = {
  devLog: async (label, data = "no data", saveDB = false) => {
    const LENGTH = 2047; //JSON.stringify(data).substring(0, LENGTH)
    const SOURCE_DATA = `API:${label}`;
    const EVENT_DATA =
      JSON.stringify(data).length > LENGTH
        ? "LONG JSON OBJECT: " + JSON.stringify(data).length
        : JSON.stringify(data);

    //console.log("EVENT_DATA", EVENT_DATA);

    const SQL = `INSERT INTO logs(source_data,event_data) VALUES($1,$2)`;

    if (process.env.NODE_ENV == "dev") console.log(`API > ${label}`);
    if (saveDB) {
      try {
        await db.none(SQL, [SOURCE_DATA, EVENT_DATA]);
      } catch (e) {
        console.log("DB_log error:", e);
      }
    }
  },
  pgSELECT: (db, columns) => {
    const SQL = "SELECT ${userColumns()} FROM users order by user_id ASC";
    return "select";
  },
};
