import GenresRepository from "../repositories/genres.repository.js";
import { ERROR_LIBELLE } from "../constantes/errors.js";

/**
 * @returns Array<Genre>
 * @author SCHMIDT Jonathan
 * @since 25/09/2025
 */
const findAll = async () => {
    try {
        const genres = GenresRepository.findAll();
        if (genres.length > 0) {
            return genres;
        } else {
            throw new Error("Aucun genre n'a pu être retourné");
        }
    } catch (error) {
        throw Error(error.message);
    }
}

/**
 * @returns Genre
 * @author SCHMIDT Jonathan
 * @since 25/09/2025
 */
const findById = async (id) => {
    try {
        const genre = GenresRepository.findById();
        if (genre.length > 0) {
            return genre;
        } else {
            throw new Error("Aucun genre trouvé avec cet identifiant");
        }
    } catch (error) {
        throw Error(error.message);
    }
}

/**
 * @returns void
 * @author SCHMIDT Jonathan
 * @since 25/09/2025
 */
const add = async (name) => {
    try {
        const nameKnown = await GenresRepository.findByName(name);
        if (nameKnown) {
            throw new Error(ERROR_LIBELLE.GENRE_TITLE_ALREADY_EXIST);
        } else {
            const add = await GenresRepository.add(name);
            if (add === 0) {
                throw new Error(ERROR_LIBELLE.ADD_GENRE_DB_ERROR);
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateById = async (genre, id) => {
    try {
        if (id === genre.id) {
            const nameKnown = await GenresRepository.findByName(genre.name);
            const genreOnBase = await GenresRepository.findById(genre.id);
            if (genreOnBase.name !== genre.name && nameKnown) {
                throw new Error(ERROR_LIBELLE.GENRE_TITLE_ALREADY_EXIST);
            } else {
                const update = await GenresRepository.updateById(id, { 
                    id: genre.id, 
                    name: genre.nameM 
                });
                if (update === false) {
                    throw new Error(ERROR_LIBELLE.ADD_GENRE_DB_ERROR);
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
        const deleted = await GenresRepository.deleteById(id);
        if (deleted === false) {
            throw new Error(ERROR_LIBELLE.REMOVE_GENRE_FAIL);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export default { findAll, findById, add, updateById, removeById }