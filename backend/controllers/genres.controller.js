import GenresService from "../services/genres.service.js";
import { ERROR_LIBELLE } from "../constantes/errors.js";

const findAll = async (req, res) => {
    try {
        const genres = await GenresService.findAll();
        return res
            .status(200)
            .json(genres);
    } catch (error) {
        if (error.message === "Aucun genre n'a pu être retourné") {
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
        const genre = await GenresService.findById(req.params.id);
        return res
            .status(200)
            .json(genre);
    } catch (error) {
        if (error.message === "Aucun genre trouvé avec cet identifiant") {
            return res
                .status(404)
                .json({
                    error: "Genre not Found",
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
        await GenresService.add(req.body.name);
        return res
            .status(200);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.GENRE_TITLE_ALREADY_EXIST) {
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
        await GenresService.updateById(req.body, req.params.id);
        return res
            .status(200);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.GENRE_TITLE_ALREADY_EXIST) {
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
        await GenresService.removeById(req.params.id);
        return res
            .status(200);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.REMOVE_GENRE_FAIL) {
            return res
                .status(404)
                .json({
                    error: "Genre not Found",
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

export default { findAll, findById, add, updateById, removeById }