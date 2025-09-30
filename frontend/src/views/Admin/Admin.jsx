import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LIBELLE } from "../../constantes/admin.constantes";
import { yupResolver } from '@hookform/resolvers/yup';
import { GenresRest } from "../../rest/genres.rest.Js";
import { FilmsRest } from "../../rest/films.rest.js";
import genreSchema from "../../validators/genres.validator.js";
import modifyGenreSchema from "../../validators/modifier-genres.validator.js";
import filmSchema from "../../validators/film.validator.js";
import "./Admin.css";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";
import FilmCard from "../../components/FilmCard/FilmCard.jsx";

export default function Admin() {

    // Récupération de l'utilisateur dans le GlobalContexte
    const { userLogged } = useContext(GlobalContext);

    // Ensemble des éléments du state nécessaire pour la gestion des films
    const [films, setFilms] = useState();
    const [filmsFormMode, setFilmsFormMode] = useState();
    const [filmsErrors, setFilmsErrors] = useState();
    // Ensemble des éléments du state nécessaire pour la gestion des genres d'un film
    const [genres, setGenres] = useState();
    const [genresFormMode, setGenresFormMode] = useState();
    const [genreErrors, setGenreErrors] = useState();
    // Permet de gérer la possibilité d'action avec les genres
    const [disableGenreAction, setDisabledGenreAction] = useState();

    /********************************
     * Section de gestion des films *
     ********************************/

    // Gestion du formulaire d'ajout de film
    const {
        handleSubmit: handleSubmitAddFilm,
        register: registerAddFilm,
        reset: resetAddFilm,
        formState: { errors: errorsAddFilm }
    } = useForm({
        resolver: yupResolver(filmSchema),
        mode: "onChange"
    });

    const sendAddFilm = async (data) => {
        try {
            const filmToAdd = {
                title: data.title,
                poster: data.poster,
                description: data.description,
                genres: data.genres,
                releaseDate: data.releaseDate,
                adminId: userLogged.id
            }
            await FilmsRest.add(filmToAdd);
            resetAddFilm();
            setFilmsErrors(null);
            //fetchFilms();
        } catch (error) {
            resetAddFilm();
            setFilmsErrors(error);
        }
    };

    // Fetch All Films

    const fetchFilms = async () => {
        try {
            const filmsListe = await FilmsRest.findAll();
            setFilms(filmsListe);
        } catch (error) {
            setFilmsErrors(error);
        }
    }

    /****************************************
     * Section de gestion des genre de film *
     ****************************************/

    // Gestion du formulaire d'ajout de genre
    const {
        handleSubmit: handleSubmitAddGenre,
        register: registerAddGenre,
        reset: resetAddGenre,
        formState: { errors: errorsAddGenre }
    } = useForm({
        resolver: yupResolver(genreSchema),
        mode: "onChange"
    });

    const sendAddGenre = async (data) => {
        try {
            await GenresRest.add(data);
            resetAddGenre();
            setGenreErrors(null);
            fetchGenres();
        } catch (error) {
            resetAddGenre();
            setGenreErrors(error);
        }
    };

    const displayFilmUpdateForm = (film) => {

    };

    const removeFilm = async (id) => {
        try {
            await FilmsRest.remove(data);
            setFilmsErrors(null);
            fetchGenres();
        } catch (error) {
            resetAddGenre();
            setGenreErrors(error);
        }
    };

    // Gestion du formulaire de modification de genre
    const {
        handleSubmit: handleSubmitUpdateGenre,
        register: registerUpdateGenre,
        reset: resetUpdateGenre,
        formState: { errors: errorsUpdateGenre }
    } = useForm({
        resolver: yupResolver(modifyGenreSchema),
        mode: "onChange"
    });

    const sendUpdateGenre = async (data) => {
        try {
            await GenresRest.updateById(data, data.id);
            resetUpdateGenre();
            setGenreErrors(null);
            setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.ADD);
            resetUpdateForm();
            fetchGenres();
            setDisabledGenreAction(false);
        } catch (error) {
            resetUpdateGenre();
            setGenreErrors(error);
            setDisabledGenreAction(false);
        }
    };

    // Gestion de la suppression d'un genre de film

    const removeGenre = async (id) => {
        try {
            await GenresRest.removeGenreById(id);
            setGenreErrors(null);
            fetchGenres();
        } catch (error) {
            setGenreErrors(error);
        }
    }

    // Mise à jour du genre d'un film

    const displayUpdateGenreForm = (genre) => {
        setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.UPDATE);
        resetAddGenre();
        resetUpdateGenre({
            id: genre.id,
            name: genre.name
        });
        setDisabledGenreAction(true);
    }

    // Switch entre les formulaires de gestion des genres de film

    const displayAddGenreForm = () => {
        resetUpdateGenre();
        setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.ADD);
        setDisabledGenreAction(false);
    }

    // FindAll Genres

    const fetchGenres = async () => {
        try {
            const genresListe = await GenresRest.findAll();
            setGenres(genresListe);
        } catch (error) {
            setGenreErrors(error.message);
        }
    }

    // Chargement de la page

    useEffect(() => {
        fetchGenres();
        fetchFilms();
        setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.ADD);
        setFilmsFormMode(LIBELLE.FILM_FORM_LIBELLE.MODE.ADD);
        setDisabledGenreAction(false);
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <h1 className="col-5">{LIBELLE.PAGE_TITLE}</h1>
                </div>
                {/*****************************
                  * Section gestion des films *
                  *****************************/}
                <div className="row mt-5">
                    <h3 className="col-5 text-decoration-underline">{LIBELLE.TITLE_FILM_MANAGEMENT}</h3>
                </div>
                {/* Zone de display des films */}
                {
                    films && films.length > 0 ?
                        films.map(film => {
                            <div>{film.title}</div>
                        }) :
                        null
                }
                {
                    films && films.length > 0 ?
                        <div>
                            <FilmCard films={films} userLogged={userLogged}
                                onDisplayUpdateForm={displayFilmUpdateForm}
                                onRemove={removeFilm} >
                            </FilmCard>
                        </div> :
                        null
                }
                <div id="filmForm" className="row mt-3">
                    {
                        filmsFormMode === LIBELLE.FILM_FORM_LIBELLE.MODE.ADD ?
                            /* Formulaire d'ajout d'un film */
                            <form method="post" className="row col-6" onSubmit={handleSubmitAddFilm(sendAddFilm)}>
                                <div className="mb-3 col-8">
                                    <label htmlFor="title" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.TITLE}</label>
                                    <input type="text" className="form-control" id="title" {...registerAddFilm("title")} />
                                </div>
                                <div className="mb-3 col-8">
                                    <label htmlFor="genres" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.GENRE_SELECTION}</label>
                                    <select className="form-select" id="genres" {...registerAddFilm("genres")} multiple>
                                        {
                                            genres && genres.length > 0 &&
                                            genres.map(genre => {
                                                return <option key={genre.id} value={genre.id}> {/* TODO: mettre en place l'auto sélection des genre du film lorsqu'ils sont ajouté ;) "<%=films.filmToModify.genres.includes(genre.name) ? 'selected' : ''" */}
                                                    {genre.name}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3 col-8">
                                    <label htmlFor="poster" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.POSTER}</label>
                                    <input type="text" className="form-control" id="poster" {...registerAddFilm("poster")} />
                                    <div id="posterHelp" className="form-text">{LIBELLE.FILM_FORM_LIBELLE.POSTER_HELPER}</div>
                                </div>
                                <div className="mb-3 col-8">
                                    <label htmlFor="releaseDate" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.RELEASE_DATE}</label>
                                    <input type="date" className="form-control" id="releaseDate" {...registerAddFilm("releaseDate")} />
                                </div>
                                <div className="mb-3 col-8">
                                    <label htmlFor="description" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.DESCRIPTION}</label>
                                    <textarea type="text" className="form-control" id="description" {...registerAddFilm("description")} rows="3"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary w-50">{LIBELLE.FILM_FORM_LIBELLE.ADD_ACTION_BUTTON}</button>
                                </div>
                            </form>
                            : /* Formulaire de modification d'un film */
                            <div>
                                <form method="post" action="<%= `/${VIEW_LIBELLE.ADMINISTRATION}/${VIEW_LIBELLE.FILMS}/${films.filmToModify.id}` %>" className="row col-6">
                                    <input type="hidden" name="id" value="<%= films.filmToModify.id %>" />
                                    <div className="mb-3 col-8">
                                        <label htmlFor="title" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.TITLE}</label>
                                        <input type="text" className="form-control" id="title" name="title" />
                                    </div>
                                    <div className="mb-3 col-8">
                                        <label htmlFor="genres" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.GENRE_SELECTION}</label>
                                        <select className="form-select" id="genres" name="genres[]" multiple>
                                            {
                                                genres && genres.length > 0 &&
                                                genres.map(genre => {
                                                    return <option key={genre.id} value={genre.id}> {/* TODO: mettre en place l'auto sélection des genre du film lorsqu'ils sont ajouté ;) "<%=films.filmToModify.genres.includes(genre.name) ? 'selected' : ''" */}
                                                        {genre.name}
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3 col-8">
                                        <label htmlFor="poster" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.POSTER}</label>
                                        <input type="text" className="form-control" id="poster" name="poster" />
                                        <div id="posterHelp" className="form-text">{LIBELLE.FILM_FORM_LIBELLE.POSTER_HELPER}</div>
                                    </div>
                                    <div className="mb-3 col-8">
                                        <label htmlFor="releaseDate" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.RELEASE_DATE}</label>
                                        <input type="date" className="form-control" id="releaseDate" name="releaseDate" />
                                    </div>
                                    <div className="mb-3 col-8">
                                        <label htmlFor="description" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.DESCRIPTION}</label>
                                        <textarea type="text" className="form-control" id="description" name="description" rows="3"></textarea>
                                    </div>
                                    <div className="col-12 row ">
                                        <button type="submit" className="btn btn-primary col-5 ms-3">
                                            {LIBELLE.FILM_FORM_LIBELLE.UPDATE_ACTION_BUTTON}
                                        </button>
                                        <button className="btn btn-danger col-5 ms-3">
                                            {LIBELLE.FILM_FORM_LIBELLE.CANCEL_BUTTON}
                                        </button>
                                    </div>
                                </form>
                            </div>
                    }
                </div>
                {
                    filmsErrors && filmsErrors.message != "" &&
                    <div className="row mt-3">
                        <p>
                            {filmsErrors.message}
                        </p>
                    </div>
                }
                {/**************************************
                  * Section gestion des genres de film *
                  **************************************/}
                <div className="row mt-5">
                    <h3 className="col-5 text-decoration-underline">{LIBELLE.GENRE_FORM_LIBELLE.FORM_TITLE}</h3>
                </div>
                <div className="row mt-3">
                    {
                        genres && genres.length > 0 ?
                            <ul id="liste-genre" className="list-group list-group-flush col-4">
                                {genres.map((genre) =>
                                    <li key={genre.id} className={`list-group-item list-group-item-action d-flex justify-content-between ${disableGenreAction ? "disabled-actions" : ""}`}>
                                        <span>
                                            {genre.name}
                                        </span>
                                        <div className="unactivated">
                                            <i className="fa-solid fa-arrow-left"></i>
                                        </div>
                                        <div className="d-none action">
                                            <button className="btn btn-alert btn-sm" onClick={() => removeGenre(genre.id)}>
                                                {LIBELLE.GENRE_FORM_LIBELLE.DELETE_BUTTON_LIBELLE}
                                            </button>
                                            <button className="btn btn-alert btn-sm" onClick={() => displayUpdateGenreForm(genre)} >
                                                {LIBELLE.GENRE_FORM_LIBELLE.UPDATE_BUTTON_LIBELLE}
                                            </button>
                                        </div>
                                    </li>
                                )}
                            </ul> : null
                    }
                </div>
                <div id="genreForm" className="row mt-3">
                    {
                        genresFormMode === LIBELLE.GENRE_FORM_LIBELLE.MODE.UPDATE ?
                            /* Formulaire de modification d'un genre */
                            < form method="post" className="row col-4" onSubmit={handleSubmitUpdateGenre(sendUpdateGenre)}>
                                <input type="hidden" className="form-control" id="id" {...registerUpdateGenre("id")} />
                                <div className="mb-3 col-8">
                                    <input type="text" className="form-control" id="name" {...registerUpdateGenre("name")} />
                                </div>
                                <div className="col-12 row ">
                                    <button type="submit" className="btn btn-primary col-5 ms-3">
                                        {LIBELLE.GENRE_FORM_LIBELLE.UPDATE_ACTION_LIBELLE}
                                    </button>
                                    <button className="btn btn-danger col-5 ms-3" onClick={() => displayAddGenreForm()}>
                                        {LIBELLE.FILM_FORM_LIBELLE.CANCEL_BUTTON}
                                    </button>
                                </div>
                            </form>
                            :
                            /* Formulaire d'ajout d'un genre */
                            <form method="post" className="row col-4 mb-5" onSubmit={handleSubmitAddGenre(sendAddGenre)}>
                                <div className="mb-3 col-8">
                                    <input type="text" className="form-control" id="name" {...registerAddGenre("name")} />
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary w-50">{LIBELLE.GENRE_FORM_LIBELLE.ADD_BUTTON_LIBELLE}</button>
                                </div>
                            </form>

                    }
                </div>
                {
                    genreErrors ?
                        <div className="row mt-3">
                            <p>
                                {genreErrors.message}
                            </p>
                        </div> : null
                }
            </div>
        </div >
    )
}