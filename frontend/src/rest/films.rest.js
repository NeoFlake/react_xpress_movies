import axios from "../../axios.config.js";
import { REST_ROAD } from "../constantes/rest.constantes.js";

export const FilmsRest = {

    findAll: async () => {
        try {
            const films = (await axios.get(`/${REST_ROAD.FILMS}`)).data;
            return films;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    add: async (film) => {
        try {
            await axios.post(`/${REST_ROAD.FILMS}`, film);
            return "done";
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    removeById: async (id) => {
        try {
            await axios.delete(`/${REST_ROAD.FILMS}/${id}`);
            return "deleted";
        } catch (error) {
            throw Error(error.reponse.data.message);
        }
    },

    updateById: async (film, id) => {
        try {
            await axios.put(`/${REST_ROAD.FILMS}/${id}`, film);
            return "updated";
        } catch (error) {
            throw Error(error.response.data.message);
        }
    }
    
} 