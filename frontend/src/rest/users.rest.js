import axios from "../../axios.config.js";
import { REST_ROAD } from "../constantes/rest.constantes.js";

export const UsersRest = {
    inscription: async (user) => {
        try {
            return await axios.post(`/${REST_ROAD.USERS}`, user);
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
    },

    findById: async (id) => {
        try {
            const user = await axios.get(`/${REST_ROAD.USERS}/${id}`);
            return user.data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    updateById: async (id, user) => {
        try {
            await axios.put(`/${REST_ROAD.USERS}/${id}`, user);
            return "updated";
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    removeById: async (id) => {
        try {
            await axios.delete(`/${REST_ROAD.USERS}/${id}`);
            return "removed";
        } catch (error) {
            throw Error(error.response.data.message);
        }
    }
} 