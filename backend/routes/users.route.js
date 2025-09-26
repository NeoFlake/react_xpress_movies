import express from "express";
import UsersController from "../controllers/users.controller.js";
import ROAD_LIBELLE from "../constantes/roads.js";

const router = express.Router();

router
    .get("/", UsersController.findAll)
    .get(`/:id`, UsersController.findById)
    .post("/", UsersController.add)
    .post(ROAD_LIBELLE.LOGIN, UsersController.login)
    .put("/:id", UsersController.updateById)
    .delete("/:id", UsersController.removeById)

export default router;