import { useContext } from "react";
import "./Navbar.css";
import { GlobalContext } from "../../contexts/GlobalContext";
import { ROLES } from "../../constantes/roles.constantes";
import { LIBELLE } from "../../constantes/navbar.constantes";
import { ROAD } from "../../constantes/road.contantes";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {

    const { userLogged } = useContext(GlobalContext);

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        console.log("Je rentre dedans");
        localStorage.removeItem("userLogged");
        localStorage.removeItem("isAuthenticated");
        navigate(`/${ROAD.ACCOUNT}/${ROAD.LOGIN}`);
    };

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand"><img src="/img/logo-site.png" alt="XpressMovies" width="100"
                        height="70" onClick={() => navigate(`/${ROAD.HOMEPAGE}`)} /></a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {
                                    userLogged.role === ROLES.ADMIN ?
                                        <a className={`nav-link ${location.pathname === `/${ROAD.ADMIN}` ? "inactive" : "active"}`}  aria-current="page" onClick={() => navigate(`/${ROAD.ADMIN}`)}>{LIBELLE.ADMIN}</a> :
                                        (
                                            userLogged.favoris && userLogged.favoris.length > 0 && userLogged.favoris[0] !== null ?
                                                < a className={`nav-link position-relative ${location.pathname === `/${ROAD.FAVORIS}` ? "inactive" : "active"}`}
                                                    aria-current="page" onClick={() => navigate(`/${ROAD.FAVORIS}`)}>{LIBELLE.FAVORIS}<span
                                                        className="position-absolute top-30 start-90 translate-middle badge rounded-pill bg-info">
                                                        { userLogged.favoris.length }
                                                        <span className="visually-hidden">{LIBELLE.FAVORIS_NUMBERS}</span>
                                                    </span>
                                                </a> : null
                                        )
                                }
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname === `/${ROAD.PROFILE}` ? "inactive" : "active"}`}
                                    onClick={() => navigate(`/${ROAD.PROFILE}`)}>{LIBELLE.PROFILE}</a>
                            </li>
                        </ul>
                        <div className="me-3">
                            { `${userLogged.lastname} ${userLogged.firstname}` }
                        </div>
                        <button className="btn btn-outline-info" type="submit" onClick={() => logout()} >{LIBELLE.LOGOUT}</button>
                    </div>
                </div>
            </nav >
            <div className="top-page">
            </div>
        </>
    );

}