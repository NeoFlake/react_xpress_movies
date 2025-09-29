import axios from "../../axios.config.js";
import { REST_ROAD } from "../constantes/rest.constantes.js";

export const FilmsRest = {

    findAll: async () => {
        try {
            const films = await axios.get(`/${REST_ROAD.FILMS}`);
            return films;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    }
    
} 