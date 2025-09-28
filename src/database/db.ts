import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",        // change if needed
  password: "",
  database: "boxy_db",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

export default connection;
