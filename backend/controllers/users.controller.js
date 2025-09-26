import UsersService from "../services/users.service.js";
import { ERROR_LIBELLE } from "../constantes/errors.js";

const findAll = async (req, res) => {
    try {
        const users = await UsersService.findAll();
        return res
            .status(200)
            .json(users);
    } catch (error) {
        if (error.message === "Aucun utilisateur n'a pu être retourné") {
            return res
                .status(200)
                .json([]);
        } else {
            return res
                .status(500)
                .json({
                    error: "Internal server error",
                    message: error.message
                });
        }
    }
}

const findById = async (req, res) => {
    try {
        const user = await UsersService.findById(req.params.id);
        return res
            .status(200)
            .json(user);
    } catch (error) {
        if (error.message === "Aucun utilisateur trouvé avec cet identifiant") {
            return res
                .status(404)
                .json({
                    error: "User not Found",
                    message: error.message
                });
        } else {
            return res
                .status(500)
                .json({
                    error: "Internal server error",
                    message: error.message
                });
        }
    }
}

const login = async (req, res) => {
    try {
        const user = await UsersService.add(req.body);
        return res
            .status(200)
            .json(user);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.AUTHENTIFICATION_FAIL) {
            return res
                .status(401)
                .json({
                    error: "Unauthorized",
                    message: error.message
                });
        } else {
            return res
                .status(500)
                .json({
                    error: "Internal server error",
                    message: error.message
                });
        }
    }
}

const add = async (req, res) => {
    try {
        await UsersService.add(req.body);
        return res
            .status(200);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.EMAIL_ALREADY_EXIST) {
            return res
                .status(400)
                .json({
                    error: "Request error",
                    message: error.message
                });
        } else {
            return res
                .status(500)
                .json({
                    error: "Internal server error",
                    message: error.message
                });
        }
    }
}

const updateById = async (req, res) => {
    try {
        await UsersService.updateById(req.body, req.params.id);
        return res
            .status(200);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.EMAIL_ALDREADY_EXIST || error.message === ERROR_LIBELLE.UPDATE_PROFILE_FAIL
            || error.message === ERROR_LIBELLE.UPDATE_PASSWORD_FAIL) {
            return res
                .status(400)
                .json({
                    error: "Request error",
                    message: error.message
                });
        } else if (error.message === ERROR_LIBELLE.BAD_PASSWORD) {
            return res
                .status(401)
                .json({
                    error: "Unauthorized",
                    message: error.message
                });
        } else {
            return res
                .status(500)
                .json({
                    error: "Internal server error",
                    message: error.message
                });
        }
    }
}

const removeById = async (req, res) => {
    try {
        await UsersService.removeById(req.params.id);
        return res
            .status(200);
    } catch (error) {
        return res
            .status(500)
            .json({
                error: "Internal server error",
                message: error.message
            });
    }
}

export default { findAll, findById, login, add, updateById, removeById }