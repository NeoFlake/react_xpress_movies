import express from "express";
import FilmsController from "../controllers/films.controller.js";
import ROAD_LIBELLE from "../constantes/roads.js";

const router = express.Router();

router
    .get("/", FilmsController.findAll)
    .get(`/:id`, FilmsController.findById)
    .get(`${ROAD_LIBELLE.TITLE}/:title`, FilmsController.findLikeByTitle)
    .post("/", FilmsController.add)
    .put("/:id", FilmsController.updateById)
    .delete("/:id", FilmsController.removeById)

export default router;