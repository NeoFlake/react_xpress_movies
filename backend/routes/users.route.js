import express from "express";
import UsersController from "../controllers/users.controller.js";

const router = express.Router();

router
    .get("/", UsersController.findAll)
    .get(`/:id`, UsersController.findById)
    .post("/", UsersController.add)
    .post("/login", UsersController.login)
    .put("/:id", UsersController.updateById)
    .delete("/:id", UsersController.removeById)

export default router;