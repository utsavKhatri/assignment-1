import express from "express";
import { createConnection } from "mysql";
import * as dotenv from "dotenv";
import courseController from "./controllers/courseController.js";

dotenv.config();

const app = express();

/* public folder as a static folder. */
app.use("/public", express.static("public"));

app.set("view engine", "ejs");

/* Creating a connection to the database. */
export const connection = createConnection({
  host: process.env.HOSTNAME,
  port: process.env.PORT,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

/* Connecting to the database. */
connection.connect((err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected successful");
  }
});

/* Importing the courseController.js file and passing the app object to it. */
courseController(app);

app.listen(3000);
console.log(`you are listening to http://localhost:3000/`);
