import { Routes, Route } from "react-router-dom";
import Account from "../../views/Account/Account.jsx";
import Admin from "../../views/Admin/Admin.jsx";
import Favoris from "../../views/Favoris/Favoris.jsx";
import HomePage from "../../views/HomePage/HomePage.jsx";
import Profile from "../../views/Profile/Profile.jsx";
import NotFound from "../../views/NotFound/NotFound.jsx";
import { ROAD_LIBELLE } from "../constantes/road.contantes.js";

// Mapping : path -> component

const AppRoutes = () => {

    return (
        <Routes>
            <Route path={`/${ROAD_LIBELLE.ACCOUNT}`} element={<Account />} /> {/* Vue d’authentification (login / inscription) */}
            <Route path={`/${ROAD_LIBELLE.ADMIN}`} element={<Admin />} /> {/* Vue d'administration du site */}
            <Route path={`/${ROAD_LIBELLE.FAVORIS}`} element={<Favoris />} /> {/* Vue de gestion des favoris  */}
            <Route path={`/${ROAD_LIBELLE.HOMEPAGE}`} element={<HomePage />} /> {/* Vue d'accueil */}
            <Route path={`/${ROAD_LIBELLE.PROFILE}`} element={<Profile />} /> {/* Vue de gestion de son profil */}
            <Route path="*" element={<NotFound />}></Route> {/* Vue par défaut lors d'un mauvais routage */}
        </Routes>
    );
}

export default AppRoutes;