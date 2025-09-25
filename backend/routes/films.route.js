import express from "express";
import FilmsController from "../controllers/films.controller.js";

const router = express.Router();

router
    .get("/", FilmsController.findAll)
    .get(`/:id`, FilmsController.findById)
    .get("/title/:title", FilmsController.findLikeByTitle)
    .post("/", FilmsController.add)
    .put("/:id", FilmsController.updateById)
    .delete("/:id", FilmsController.removeById)

export default router;