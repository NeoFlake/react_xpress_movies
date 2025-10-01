import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LIBELLE } from "../../constantes/admin.constantes";
import { yupResolver } from '@hookform/resolvers/yup';
import { GenresRest } from "../../rest/genres.rest.Js";
import { FilmsRest } from "../../rest/films.rest.js";
import DateService from "../../services/date.service.js";
import genreSchema from "../../validators/genres.validator.js";
import modifyGenreSchema from "../../validators/modifier-genres.validator.js";
import filmSchema from "../../validators/film.validator.js";
import modifyFilmSchema from "../../validators/modifier-film.validator.js";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";
import FilmCard from "../../components/FilmCard/FilmCard.jsx";

export default function GenresAdmin({ genres, updatedGenres }) {

    // Ensemble des éléments du state nécessaire pour la gestion des genres d'un film
    const [genresFormMode, setGenresFormMode] = useState();
    const [genreErrors, setGenreErrors] = useState();
    // Permet de gérer la possibilité d'action avec les genres
    const [disableGenreAction, setDisabledGenreAction] = useState();

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
            updatedGenres();
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
            resetUpdateGenre();
            setDisabledGenreAction(false);
            updatedGenres();
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
            updatedGenres();
        } catch (error) {
            setGenreErrors(error);
        }
    }

    // Switch entre les formulaires de gestion des genres de film

    const displayAddGenreForm = () => {
        resetUpdateGenre();
        setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.ADD);
        setDisabledGenreAction(false);
    }

    const displayUpdateGenreForm = (genre) => {
        setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.UPDATE);
        resetAddGenre();
        resetUpdateGenre({
            id: genre.id,
            name: genre.name
        });
        setDisabledGenreAction(true);
    }

    useEffect(() => {
        setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.ADD);
        setDisabledGenreAction(false);
    }, []);

    return (
        <>
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
                                <button type="button" className="btn btn-danger col-5 ms-3" onClick={() => displayAddGenreForm()}>
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
        </>
    );
}