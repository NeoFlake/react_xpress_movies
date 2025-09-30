import "./FilmCard.css";
import { useLocation } from "react-router-dom";
import { ROLES } from "../../constantes/roles.constantes";
import { LIBELLE } from "../../constantes/film-card.constantes";
import DateService from "../../services/date.service.js";

export default function FilmCard({
    films,
    userLogged,
    onDisplayUpdateForm = () => { },
    onRemove = () => { },
    onAddFavori = () => { }, }) {

    const location = useLocation();

    const displayUpdateForm = (film) => {
        onDisplayUpdateForm(film);
    };

    const remove = (id) => {
        onRemove(id);
    };

    const addFavori = (id) => {
        onAddFavori(id);
    };

    return (
        /* <link rel="stylesheet" href="../css/film-card.css" />
        <script defer src="../js/expand-film-resume.js"></script>
        "<% - include('full-poster-modal') %>"  */
        <div className="row mt-5">
            {
                films.map(film => {
                    return <div key={film.id} className="card col-3 mt-1">
                        <img src={film.poster} className="card-img-top" alt="une belle affiche" />
                        <div className="card-body">
                            <h5 className="card-title">
                                {film.title}
                            </h5>
                            {
                                film.genres.map(genre => {
                                    <span className="badge bg-primary text-bg-primary mb-2">
                                        {genre}
                                    </span>
                                })
                            }
                            <p className="card-text"> {`${LIBELLE.RELEASE_DATE} ${DateService.formatToHumanReading(film.releaseDate)}}`}</p>
                            <p className="card-text resume-text mb-3 cursor-pointer" id={`description-film-${film.id}`}>
                                {film.description}
                            </p>
                            <div className="d-flex justify-content-end">
                                {
                                    /* Zone d'affichage réservé à la page d'accueil */
                                    location.pathname === "/homepage" ? (
                                        userLogged.role === ROLES.ADMIN ? (
                                            /* Button de modification du film réservé aux admins */
                                            <button className="btn btn-primary me-2">
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
                                        location.pathname === "/admin" ? (
                                            <>
                                                <button className="btn btn-primary me-2" onClick={() => displayUpdateForm(film)}>
                                                    {LIBELLE.UPDATE_BUTTON}
                                                </button>
                                                <button className="btn btn-danger" onClick={() => remove(film.id)}>
                                                    {LIBELLE.DELETE_BUTTON}
                                                </button>
                                            </>
                                        ) :
                                            /* Zone d'affichage réservé à la page des favoris */
                                            location.pathname === "/favoris" ? (
                                                <i
                                                    className="fa-solid fa-star yellowstar cursor-pointer"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#suppression-modale"
                                                    data-bs-film-title={film.title} data-bs-id={film.id}
                                                ></i>
                                            ) : null
                                }
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}