import { createContext, useState } from "react";
import { ROLES } from "../constantes/roles.constantes.js";

export const GlobalContext = createContext();

export const Provider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false || localStorage.getItem("isAuthenticated"))

    const [userLogged, setUserLogged] = useState(JSON.parse(localStorage.getItem("userLogged")) || {
        lastname: "",
        firstname: "",
        email: "",
        role: "",
        favoris: [],
    });

    return (
        <GlobalContext.Provider value={{
            userLogged, setUserLogged,
            isAuthenticated, setIsAuthenticated
        }}>
            {children}
        </GlobalContext.Provider>
    )
}