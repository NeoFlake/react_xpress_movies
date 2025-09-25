import FilmsService from "../services/films.service.js";
import { ERROR_LIBELLE } from "../constantes/errors.js";

const findAll = async (req, res) => {
    try {
        const films = await FilmsService.findAll();
        return res
            .status(200)
            .json(films);
    } catch (error) {
        if (error.message === "Aucun film n'a pu être retourné") {
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
        const genre = await FilmsService.findById(req.params.id);
        return res
            .status(200)
            .json(genre);
    } catch (error) {
        if (error.message === "Aucun film trouvé avec cet identifiant") {
            return res
                .status(404)
                .json({
                    error: "Film not Found",
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

const findLikeByTitle = async (req, res) => {
    try {
        const films = await FilmsService.findLikeByTitle(req.params.title);
        return res
            .status(200)
            .json(films);
    } catch (error) {
        if (error.message === "Aucun film trouvé avec cette recherche") {
            return res
                .status(404)
                .json({
                    error: "Film not Found",
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
        await FilmsService.add(req.body);
        return res
            .status(200);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.FILM_TITLE_ALREADY_EXIST) {
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
        await FilmsService.updateById(req.body, req.params.id);
        return res
            .status(200);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.FILM_TITLE_ALREADY_EXIST) {
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

const removeById = async (req, res) => {
    try {
        await FilmsService.removeById(req.params.id);
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

export default { findAll, findById, findLikeByTitle, add, updateById, removeById }