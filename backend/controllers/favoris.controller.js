import FavorisService from "../services/favoris.service.js";
import { ERROR_LIBELLE } from "../constantes/errors.js";

const displayView = async (req, res) => {
    try {
        const favoris = await FavorisService.displayView(req);
        res.render(VIEW_LIBELLE.FAVORIS, favoris);
    } catch (error) {
        res.redirect(`/${VIEW_LIBELLE.HOMEPAGE}`);
    }
}

const remove = async (req, res) => {
    try {
        await FavorisService.remove(req);
        res.redirect(`/${VIEW_LIBELLE.FAVORIS}`);
    } catch (error) {
        res.redirect(`/${VIEW_LIBELLE.FAVORIS}`);
    }
}

// .post("/", FavorisController.add)
//     .delete("/", FavorisController.removeByUserAndFilmId);

const add = async (req, res) => {
    try {
        await FavorisService.add(req.body);
        return res
            .status(200);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.NEW_FAVORI_ERROR) {
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

const removeByUserAndFilmId = async (req, res) => {
    try {
        await FavorisService.removeByUserAndFilmId(req.body);
        return res
            .status(200);
    } catch (error) {
        if (error.message === ERROR_LIBELLE.NEW_FAVORI_ERROR) {
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

export default { displayView, remove, add, removeByUserAndFilmId }