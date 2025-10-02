import axios from "../../axios.config.js";
import { REST_ROAD } from "../constantes/rest.constantes.js";

export const FavorisRest = {

    add: async (credentials) => {
        try {
            await axios.post(`/${REST_ROAD.FAVORIS}`, credentials);
            return "done";
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    remove: async (favori) => {
        try {
            await axios.delete(`${REST_ROAD.FAVORIS}`, { data: favori });
            return "remove";
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

}