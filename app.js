import express from "express";
import { createConnection } from "mysql";
import * as dotenv from "dotenv";
import router from "./routes/courseRoutes.js";
dotenv.config();
const app = express();
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

export const connection = createConnection({
  host: process.env.HOSTNAME,
  port: process.env.PORT,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected successful");
  }
});

app.use(router)

app.use((req,res)=>{
  res.status(400).render('404',{title: "404 not found"})
})

app.listen(3000);
console.log(`you are listening to http://localhost:3000/`);
