import express from "express";
import GenresController from "../controllers/genres.controller.js";

const router = express.Router();

router
    .get("/", GenresController.findAll)
    .get(`/:id`, GenresController.findById)
    .post("/", GenresController.add)
    .put("/:id", GenresController.updateById)
    .delete("/:id", GenresController.removeById)

export default router;