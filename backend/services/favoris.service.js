import FavorisRepository from "../repositories/favoris.repository.js";
import { ERROR_LIBELLE } from "../constantes/errors.js";

const removeByUserAndFilmId = async (favori) => {
    try {
        const withdrawFavorite = await FavorisRepository.removeByUserAndFilmId(favori.userId, favori.filmId);
        if (withdrawFavorite === 0) {
            throw new Error(ERROR_LIBELLE.REMOVE_FAVORI_FAIL);
        }
    } catch (error) {
        throw new Error(ERROR_LIBELLE.REMOVE_FAVORI_FAIL);
    }
}

const add = async (newFavori) => {
    try {
        const favori = await FavorisRepository.add({
            userId: newFavori.userId,
            filmId: newFavori.filmId
        });
        if (favori === 0) {
            throw new Error(ERROR_LIBELLE.NEW_FAVORI_ERROR);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export default { displayView, removeByUserAndFilmId, add }