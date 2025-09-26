import { UserRest } from "../rest/users.rest.js";

export const UserService = {
    inscription: (user) => {
       UserRest.inscription(user);
    }
} 