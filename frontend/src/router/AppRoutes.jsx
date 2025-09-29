import { Routes, Route } from "react-router-dom";
import Account from "../views/Account/Account.jsx";
import Admin from "../views/Admin/Admin.jsx";
import Favoris from "../views/Favoris/Favoris.jsx";
import HomePage from "../views/Homepage/Homepage.jsx";
import Profile from "../views/Profile/Profile.jsx";
import NotFound from "../views/NotFound/NotFound.jsx";
import { ROAD } from "../constantes/road.contantes.js";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext.jsx";
import AuthenticatedRoutes from "./AuthenticatedRoutes.jsx";
import AdminRoutes from "./AdminRoutes.jsx";
import AbonneRoutes from "./AbonneRoutes.jsx";

// Mapping : path -> component

const AppRoutes = () => {

    const { isAuthenticated, userLogged } = useContext(GlobalContext);

    return (
        <Routes>
            <Route path={`/${ROAD.ACCOUNT}/:mode`} element={<Account />} /> {/* Vue d’authentification (login / inscription) */}
            <Route element={<AuthenticatedRoutes isAuthenticated={isAuthenticated} />}>
                <Route path={`/${ROAD.HOMEPAGE}`} element={<HomePage />} /> {/* Vue d'accueil */}
                <Route path={`/${ROAD.PROFILE}`} element={<Profile />} /> {/* Vue de gestion de son profil */}
                <Route element={<AdminRoutes userRole={userLogged.role} />}>
                    <Route path={`/${ROAD.ADMIN}`} element={<Admin />} /> {/* Vue d'administration du site */}
                </Route>
                <Route element={<AbonneRoutes userRole={userLogged.role} />}>
                    <Route path={`/${ROAD.FAVORIS}`} element={<Favoris />} /> {/* Vue de gestion des favoris  */}
                </Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route> {/* Vue par défaut lors d'un mauvais routage */}
        </Routes>
    );
}

export default AppRoutes;