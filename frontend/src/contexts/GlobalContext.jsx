import { createContext, useState } from "react";
import { ROLES } from "../constantes/roles.constantes.js";

export const GlobalContext = createContext();

export const Provider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false || localStorage.getItem("isAuthenticated"));

    const [fullFilmList, setFullFilmList] = useState([]);

    const [userLogged, setUserLogged] = useState(JSON.parse(localStorage.getItem("userLogged")) || {
        id: 0,
        lastname: "",
        firstname: "",
        email: "",
        role: "",
        favoris: [],
    });

    return (
        <GlobalContext.Provider value={{
            userLogged, setUserLogged,
            isAuthenticated, setIsAuthenticated,
            fullFilmList, setFullFilmList
        }}>
            {children}
        </GlobalContext.Provider>
    )
}