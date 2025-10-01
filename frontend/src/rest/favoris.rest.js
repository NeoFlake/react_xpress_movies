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
    }

}