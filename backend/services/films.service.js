import FilmsRepository from "../repositories/films.repository.js";
import { ERROR_LIBELLE } from "../constantes/errors.js";

/**
 * @returns Array<Film>
 * @author SCHMIDT Jonathan
 * @since 25/09/2025
 */
const findAll = async () => {
    try {
        const films = FilmsRepository.findAll();
        if (films.length > 0) {
            return films;
        } else {
            throw new Error("Aucun film n'a pu être retourné");
        }
    } catch (error) {
        throw Error(error.message);
    }
}

/**
 * @returns Film
 * @author SCHMIDT Jonathan
 * @since 25/09/2025
 */
const findById = async (id) => {
    try {
        const film = FilmsRepository.findById(id);
        if (film.length > 0) {
            return film;
        } else {
            throw new Error("Aucun film trouvé avec cet identifiant");
        }
    } catch (error) {
        throw Error(error.message);
    }
}

/**
 * @returns Array<Film>
 * @author SCHMIDT Jonathan
 * @since 25/09/2025
 */
const findLikeByTitle = async (title) => {
    try {
        const films = FilmsRepository.findLikeByTitle(title);
        if (films.length > 0) {
            return films;
        } else {
            throw new Error("Aucun film trouvé avec cette recherche");
        }
    } catch (error) {
        throw Error(error.message);
    }
}

/**
 * @returns Array<Film>
 * @author SCHMIDT Jonathan
 * @since 25/09/2025
 */
const add = async (film) => {
    try {
        const titleKnown = await FilmsRepository.findByTitle(film.title);
        if (titleKnown) {
            throw new Error(ERROR_LIBELLE.FILM_TITLE_ALREADY_EXIST);
        } else {
            const filmToAdd = {
                title: film.title,
                genres: film.genres,
                poster: film.poster,
                releaseDate: film.releaseDate,
                description: film.description,
                adminId: film.adminId
            }
            const add = await FilmsRepository.add(filmToAdd);
            if (add === false) {
                throw new Error(ERROR_LIBELLE.ADD_FILM_DB_ERROR);
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateById = async (film, id) => {
    try {
        if (film.id === id) {
            const titleKnown = await FilmsRepository.findByTitle(film.title);
            const filmOnBase = await FilmsRepository.findById(film.id);
            if (filmOnBase.title !== film.title && titleKnown) {
                throw new Error(ERROR_LIBELLE.FILM_TITLE_ALREADY_EXIST);
            } else {
                const update = await FilmsRepository.updateById(req.params.id, {
                    id: film.id,
                    title: film.title,
                    poster: film.poster,
                    releaseDate: film.releaseDate,
                    description: film.description,
                    addedDate: filmOnBase.addedDate,
                    genres: film.genres,
                    adminId: film.adminId
                });
                if (update === 0) {
                    throw new Error(ERROR_LIBELLE.UPDATE_FILM_FAIL);
                }
            }
        } else {
            throw new Error(ERROR_LIBELLE.TECHNICAL_ERROR_ON_SUBMISSION);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * @returns void
 * @author SCHMIDT Jonathan
 * @since 25/09/2025
 */
const removeById = async (id) => {
    try {
        const deleted = await FilmsRepository.deleteById(id);
        if (deleted === 0) {
            throw new Error(ERROR_LIBELLE.REMOVE_FILM_FAIL);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export default { findAll, findById, findLikeByTitle, add, updateById, removeById }