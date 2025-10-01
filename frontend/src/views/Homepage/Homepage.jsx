import { useContext, useEffect, useState } from 'react';
import { LIBELLE } from '../../constantes/homepage.constantes.Js';
import { GlobalContext } from '../../contexts/GlobalContext';
import FilmCard from "../../components/FilmCard/FilmCard.jsx";
import searchByTitleSchema from "../../validators/search-film-title.validator.js";
import { FilmsRest } from "../../rest/films.rest.js";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FavorisRest } from "../../rest/favoris.rest.js";

export default function Homepage() {

    const { films, userLogged, updatedUser } = useContext(GlobalContext);

    const [searchError, setSearchError] = useState(null);
    const [filmsToDisplay, setFilmsToDisplay] = useState([]);

    // Gestion du formulaire d'ajout de film
    const {
        handleSubmit: handleSearchFilm,
        register: registerSearchFilm,
        reset: resetSearchFilm,
        formState: { errors: errorsSearchFilm }
    } = useForm({
        resolver: yupResolver(searchByTitleSchema),
        mode: "onChange"
    });

    const sendSearchFilm = async (data) => {
        try {
            const searchedFilms = await FilmsRest.findLikeByTitle(data.title);
            setFilmsToDisplay(searchedFilms.data);
        } catch (error) {
            resetSearchFilm();
            setSearchError(error);
        }
    };

    const addFavori = async (id) => {
        try {
            await FavorisRest.add({
                userId: userLogged.id,
                filmId: id
            });
            updatedUser();
        } catch (error) {
            setSearchError(error);
        }
    };

    useEffect(() => {
        setFilmsToDisplay(films);
    }, [films]);

    return (
        <div className="container">
            <div className="row mt-5 d-flex justify-content-center">
                <h1 className="col-3">{LIBELLE.TITLE}</h1>
            </div>
            { /** Zone de recherche des films par titre */}
            <div>
                <form method="post" className="row" onSubmit={handleSearchFilm(sendSearchFilm)}>
                    <div className="col-4 mb-3">
                        <label htmlFor="title" className="form-label ms-2">{LIBELLE.SEARCH.TITLE}</label>
                        <input type="text" className="form-control" id="title" {...registerSearchFilm("title")} placeholder={LIBELLE.SEARCH.PLACEHOLDER} />
                        {errorsSearchFilm.title && (
                            <p className="text-danger mt-1">{errorsSearchFilm.title.message}</p>
                        )}
                    </div>
                    <div className="col-1 mt-3">
                        <button type="submit" className="btn btn-primary mt-3"><i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                </form>
            </div>
            { /** Zone d'apparition des erreurs lors de la recherche */
                searchError && searchError != "" ?
                    <div className="row mt-5">
                        <p>
                            {searchError.message}
                        </p>
                    </div> : null
            }
            { /** Zone d'apparition des films */
                filmsToDisplay && filmsToDisplay.length > 0 ?
                    <div>
                        <FilmCard films={filmsToDisplay} userLogged={userLogged} onAddFavori={addFavori}></FilmCard>
                    </div> :
                    null
            }
        </div>
    );
}