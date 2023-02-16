import { Router } from "express";
import { connection } from "../app.js";

const router = Router();

/* GET home page. */
router.get("/", (req, res) => {
  connection.query("select * from courses_table order by id", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render("home", { title: "home page", data: data });
  });
});

/* This is a route that renders the add.ejs file. */
router.get("/add", (req, res) => {
  res.render("addCourse", { title: "Add Course page" });
});

/* This is a route that renders the about.ejs file. */
router.get("/about",(req,res)=>{
    res.render("about", { title: "About page" });
})


/* This is a route that handle post req and add data to database */
router.post("/add", (req, res) => {
  const user = [req.body.name, req.body.duration, req.body.fees];
  console.log(user);

  // let str = "INSERT INTO courses_table (name, email) VALUES"+ user
  connection.query(
    `INSERT INTO courses_table (name, duration, fees) VALUES ("${req.body.name}","${req.body.duration}","${req.body.fees}")`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.render("addCourse", {
          title: "Add course page"
        });
      } else {
        res.redirect("/");
      }
    }
  );
});

/* This is a route that renders the editCourse.ejs file. */
router.get("/edit/:id", (req, res) => {
    connection.query(
      `SELECT * FROM courses_table WHERE id = ${req.params.id}`,
      (err, data) => {
        if (err)
          throw err;

        // if user not found
        else {
          // if user found
          console.log(data);
          // render to views/user/edit.ejs template file
          res.render("editCourse", {
            title: "Edit User",
            data: data,
          });
        }
      }
    );
  });

/* This is a route that handle post req and update data to database */
router.post("/edit/:id", (req, res) => {
  const updateUser = [req.body.name, req.body.duration, req.body.fees];
  console.log(updateUser);
  connection.query(
    `UPDATE courses_table
  SET name = '${req.body.name}', duration = '${req.body.duration}', fees = '${req.body.fees}'
  WHERE id = ${req.params.id};`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.render("editCourse", {
          title: "Edit User",
          data: req.body,
        });
      } else {
        res.redirect("/");
      }
    }
  );
});

/* This is a route that handle delete req and delete data from database. */
router.delete("/deleteCourse/:id", (req, res) => {
  const deleteId = req.params.id;
  console.log(deleteId);
  connection.query(`DELETE FROM courses_table WHERE id='${deleteId}';`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).render("404");
    } else {
      res.json({ redirect: "/" });
    }
  });
});

export default router;
