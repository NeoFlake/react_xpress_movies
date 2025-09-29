import { Navigate, Outlet } from "react-router-dom";
import { ROAD } from "../constantes/road.contantes.js";
import { ACCOUNT_MODE } from "../constantes/account.constantes";

export default function AuthenticatedRoutes({ isAuthenticated }) {
    return isAuthenticated ? <Outlet /> : <Navigate to={`/${ROAD.ACCOUNT}/${ACCOUNT_MODE.LOGIN}`} />
}