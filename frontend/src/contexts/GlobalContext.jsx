import { createContext } from "react";

export const GlobalContext = createContext()

export const Provider = ({ children }) => {

    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    )
}