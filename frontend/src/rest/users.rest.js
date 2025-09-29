import axios from "../../axios.config.js";
import { REST_ROAD } from "../constantes/rest.constantes.js";

export const UserRest = {
    inscription: async (user) => {
        try {
            await axios.post(`/${REST_ROAD.USERS}`, user);
            return "inscription done";
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    login: async (user) => {
        try {
            const logged = await axios.post(`/${REST_ROAD.USERS}/${REST_ROAD.LOGIN}`, user);
            return logged.data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    }
} 