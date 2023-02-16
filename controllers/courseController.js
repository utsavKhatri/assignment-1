import express from "express";
import router from "../routes/courseRoutes.js";

/* courseController export function to app */
export default function(app){
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
    app.use((req, res) => {
        res.status(400).render("404", { title: "404 not found" });
    });
}
