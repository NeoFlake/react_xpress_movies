import axios from "../../axios.config.js";

export const UserRest = {
    inscription: (user) => {
        axios
            .post("/users", user)
            .then(() => "inscription done")
            .catch(error => console.log(error.message));
    }
} 