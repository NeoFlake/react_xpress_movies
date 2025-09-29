import { Navigate, Outlet } from "react-router-dom";
import { ROAD } from "../constantes/road.contantes.js";
import { ROLES } from "../constantes/roles.constantes.js";

export default function AdminRoutes({ userRole }) {
    return userRole === ROLES.ADMIN ? <Outlet /> : <Navigate to={`/${ROAD.HOMEPAGE}`} />
}