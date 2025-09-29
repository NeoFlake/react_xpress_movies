import axios from "../../axios.config.js";
import { REST_ROAD } from "../constantes/rest.constantes.js";

export const GenresRest = {

    findAll: async () => {
        try {
            const genres = await axios.get(`/${REST_ROAD.GENRES}`);
            return genres.data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    add: async (genre) => {
        try {
            await axios.post(`/${REST_ROAD.GENRES}`, genre);
            return "done";
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    updateById: async (genre, id) => {
        try {
            await axios.put(`/${REST_ROAD.GENRES}/${id}`, genre);
            return "done";
        } catch (error) {
            throw Error(error.response.data.message)
        }
    },

    removeGenreById: async (id) => {
        try {
            await axios.delete(`/${REST_ROAD.GENRES}/${id}`);
            return "done";
        } catch (error) {
            throw Error(error.response.data.message);
        }
    }

} 