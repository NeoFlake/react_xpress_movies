import express from "express";
import FavorisController from "../controllers/favoris.controller.js";

const router = express.Router();

router
    .post("/", FavorisController.add)
    .delete("/", FavorisController.removeByUserAndFilmId);

export default router;