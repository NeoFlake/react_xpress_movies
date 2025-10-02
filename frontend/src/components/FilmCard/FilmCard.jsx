import "./FilmCard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ROLES } from "../../constantes/roles.constantes";
import { ROAD } from "../../constantes/road.contantes.js";
import { LIBELLE } from "../../constantes/film-card.constantes";
import DateService from "../../services/date.service.js";
import { useContext, useState } from "react";
import FullPoster from "../../components/modales/FullPoster/FullPoster.jsx";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";

export default function FilmCard({
    films,
    userLogged,
    disableFilmAction = false,
    onDisplayUpdateForm = () => { },
    onRemove = () => { },
    onAddFavori = () => { },
    onRemoveFavori = () => { } }) {

    const location = useLocation();
    const navigate = useNavigate();

    const { updateFilm } = useContext(GlobalContext);

    const [isExpanded, setIsExpanded] = useState(null);
    // State pour permettre d'ouvrir la modale d'affichage de l'affiche en plein écran
    const [selectedPoster, setSelectedPoster] = useState(null);

    const displayUpdateForm = (film) => {
        onDisplayUpdateForm(film);
    };

    const remove = (id) => {
        onRemove(id);
    };

    const addFavori = (id) => {
        onAddFavori(id);
    };

    const removeFavori = (film) => {
        onRemoveFavori(film);
    };

    const toggleExpand = (id) => {
        setIsExpanded(prev => (prev === id ? null : id));
    };

    const goToUpdateFilm = (film) => {
        updateFilm(film);
        navigate(`/${ROAD.ADMIN}`);
    };

    return (
        <>
            <FullPoster poster={selectedPoster} onClose={() => setSelectedPoster(null)} />
            <div className="row mt-5">
                {
                    films.map(film => {
                        return <div key={film.id} className="card col-3 mt-1">
                            <img
                                src={film.poster}
                                className="card-img-top"
                                alt="une belle affiche"
                                onClick={() => setSelectedPoster(film.poster)}
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {film.title}
                                </h5>
                                {
                                    film.genres.map(genre => {
                                        return <span key={genre} className="badge bg-primary text-bg-primary mb-2 me-1">
                                            {genre}
                                        </span>
                                    })
                                }
                                <p className="card-text"> {`${LIBELLE.RELEASE_DATE} ${DateService.formatToHumanReading(film.releaseDate)}`}</p>
                                <p className={`card-text resume-text mb-3 cursor-pointer ${isExpanded === film.id ? 'full-text' : ''}`} id={`description-film-${film.id}`}
                                    onClick={() => toggleExpand(film.id)}>
                                    {film.description}
                                </p>
                                <div className="d-flex justify-content-end">
                                    {
                                        /* Zone d'affichage réservé à la page d'accueil */
                                        location.pathname === `/${ROAD.HOMEPAGE}` ? (
                                            userLogged.role === ROLES.ADMIN ? (
                                                /* Button de modification du film réservé aux admins */
                                                <button className="btn btn-primary me-2" onClick={() => goToUpdateFilm(film)}>
                                                    {LIBELLE.UPDATE_BUTTON}
                                                </button>
                                            ) : (
                                                /* Zone réservé aux abonnés */
                                                userLogged.favoris.filter(f => f !== null).some(favori => favori.id === film.id) ? (
                                                    /* L'abonné a un film en favori */
                                                    <i className="fa-solid fa-star yellowstar"></i>
                                                ) : (
                                                    /* Tous les films qui ne sont pas en favori */
                                                    <i className="fa-regular fa-star cursor-pointer" onClick={() => addFavori(film.id)}></i>
                                                )
                                            )
                                        ) :
                                            /* Zone d'affichage réservé à la page admin */
                                            location.pathname === `/${ROAD.ADMIN}` ? (
                                                <>
                                                    <button disabled={disableFilmAction} className="btn btn-primary me-2" onClick={() => displayUpdateForm(film)}>
                                                        {LIBELLE.UPDATE_BUTTON}
                                                    </button>
                                                    <button disabled={disableFilmAction} className="btn btn-danger" onClick={() => remove(film.id)}>
                                                        {LIBELLE.DELETE_BUTTON}
                                                    </button>
                                                </>
                                            ) :
                                                /* Zone d'affichage réservé à la page des favoris */
                                                location.pathname === `/${ROAD.FAVORIS}` ? (
                                                    <i className="fa-solid fa-star yellowstar cursor-pointer" onClick={() => removeFavori(film)}>
                                                    </i>
                                                ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    );
}