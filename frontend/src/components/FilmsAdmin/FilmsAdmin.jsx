import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LIBELLE } from "../../constantes/admin.constantes";
import { yupResolver } from '@hookform/resolvers/yup';
import { FilmsRest } from "../../rest/films.rest.js";
import DateService from "../../services/date.service.js";
import filmSchema from "../../validators/film.validator.js";
import modifyFilmSchema from "../../validators/modifier-film.validator.js";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";
import FilmCard from "../../components/FilmCard/FilmCard.jsx";

export default function FilmsAdmin({ films, genres, updatedFilms }) {

    // Ensemble des éléments du state nécessaire pour la gestion des films
    const [filmsFormMode, setFilmsFormMode] = useState();
    const [filmsErrors, setFilmsErrors] = useState();
    // Permet de gérer la possibilité d'action avec les films
    const [disableFilmAction, setDisabledFilmAction] = useState();

    // Récupération de l'utilisateur dans le GlobalContexte
    const { userLogged } = useContext(GlobalContext);

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
            };
            await FilmsRest.add(filmToAdd);
            resetAddFilm();
            setFilmsErrors(null);
            updatedFilms();
        } catch (error) {
            resetAddFilm();
            setFilmsErrors(error);
        }
    };

    // Gestion du formulaire de modification de film
    const {
        handleSubmit: handleSubmitUpdateFilm,
        register: registerUpdateFilm,
        reset: resetUpdateFilm,
        formState: { errors: errorsUpdateFilm }
    } = useForm({
        resolver: yupResolver(modifyFilmSchema),
        mode: "onChange"
    });

    const sendUpdateFilm = async (data) => {
        try {
            data.genres.sort((a, b) => a - b);
            await FilmsRest.updateById(data, data.id);
            resetUpdateFilm();
            setFilmsErrors(null);
            setFilmsFormMode(LIBELLE.FILM_FORM_LIBELLE.MODE.ADD);
            resetUpdateFilm();
            setDisabledFilmAction(false);
            updatedFilms();
        } catch (error) {
            resetUpdateGenre();
            setGenreErrors(error);
            setDisabledFilmAction(false);
        }
    };

    useEffect(() => {
        setFilmsFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.ADD);
        setDisabledFilmAction(false);
    }, []);

    // Permet de switcher entre les formulaires de gestion de film

    const displayAddFilmForm = () => {
        resetUpdateFilm();
        resetAddFilm();
        setFilmsFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.ADD);
        setDisabledFilmAction(false);
    }

    const displayFilmUpdateForm = (film) => {
        setFilmsFormMode(LIBELLE.FILM_FORM_LIBELLE.MODE.UPDATE);
        resetAddFilm();
        // Récupère les valeurs nécessaire pour aider RHF à pouvoir matcher les préselections
        let filmToUpdate = { ...film };
        filmToUpdate.genres = filmToUpdate.genres
            .map(name => {
                const g = genres.find(gen => gen.name === name);
                return g ? g.id : null;
            })
            .filter(Boolean);
        resetUpdateFilm({
            id: film.id,
            title: film.title,
            poster: film.poster,
            genres: filmToUpdate.genres.map(id => id.toString()),
            // Eh ouais conversion pour bien matcher le type en front (ouais Mossieur ne veux que du string en front jpp)
            releaseDate: DateService.formatToService(film.releaseDate),
            description: film.description
        });
        setDisabledFilmAction(true);
    };

    // Suppression d'un film

    const removeFilm = async (id) => {
        try {
            await FilmsRest.removeById(id);
            setFilmsErrors(null);
            updatedFilms();
        } catch (error) {
            setFilmsErrors(error);
        }
    };

    return (
        <>
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
                        <FilmCard films={films} userLogged={userLogged} disableFilmAction={disableFilmAction}
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
                                <select className="form-select" id="genres" {...registerAddFilm("genres")} multiple={true}>
                                    {
                                        genres && genres.length > 0 &&
                                        genres.map(genre => {
                                            return <option key={genre.id} value={genre.id}>
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
                        <form method="post" className="row col-6" onSubmit={handleSubmitUpdateFilm(sendUpdateFilm)}>
                            <input type="hidden" name="id" {...registerUpdateFilm("id")} />
                            <div className="mb-3 col-8">
                                <label htmlFor="title" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.TITLE}</label>
                                <input type="text" className="form-control" id="title" {...registerUpdateFilm("title")} />
                            </div>
                            <div className="mb-3 col-8">
                                <label htmlFor="genres" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.GENRE_SELECTION}</label>
                                <select className="form-select" id="genres" {...registerUpdateFilm("genres", {
                                    // Oui il faut faire une reconversion derrière pour limiter la casse à l'envoi en back, Cnawak
                                    setValueAs: vals =>
                                        vals?.map(v => parseInt(v, 10)) || []
                                })} multiple={true}>
                                    {
                                        genres && genres.length > 0 &&
                                        genres.map((genre) => {
                                            return <option key={genre.id} value={genre.id.toString()} >
                                                {genre.name}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-3 col-8">
                                <label htmlFor="poster" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.POSTER}</label>
                                <input type="text" className="form-control" id="poster" {...registerUpdateFilm("poster")} />
                                <div id="posterHelp" className="form-text">{LIBELLE.FILM_FORM_LIBELLE.POSTER_HELPER}</div>
                            </div>
                            <div className="mb-3 col-8">
                                <label htmlFor="releaseDate" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.RELEASE_DATE}</label>
                                <input type="date" className="form-control" id="releaseDate" {...registerUpdateFilm("releaseDate")} />
                            </div>
                            <div className="mb-3 col-8">
                                <label htmlFor="description" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.DESCRIPTION}</label>
                                <textarea type="text" className="form-control" id="description" {...registerUpdateFilm("description")} rows="3"></textarea>
                            </div>
                            <div className="col-12 row ">
                                <button type="submit" className="btn btn-primary col-5 ms-3">
                                    {LIBELLE.FILM_FORM_LIBELLE.UPDATE_ACTION_BUTTON}
                                </button>
                                <button type="button" className="btn btn-danger col-5 ms-3" onClick={() => displayAddFilmForm()}>
                                    {LIBELLE.FILM_FORM_LIBELLE.CANCEL_BUTTON}
                                </button>
                            </div>
                        </form>
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
        </>
    );

}