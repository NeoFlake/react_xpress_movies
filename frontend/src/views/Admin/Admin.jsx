import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LIBELLE } from "../../constantes/admin.constantes";
import { yupResolver } from '@hookform/resolvers/yup';
import { GenresRest } from "../../rest/genres.rest.Js";
import genreSchema from "../../validators/genres.validator.js";
import modifyGenreSchema from "../../validators/modifier-genres.validator.js";
import "./Admin.css";

export default function Admin() {

    const [genres, setGenres] = useState();
    const [genresFormMode, setGenresFormMode] = useState();
    const [genreErrors, setGenreErrors] = useState();

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
            fetchGenres();
        } catch (error) {
            resetUpdateGenre();
            setGenreErrors(error);
        }
    };

    const removeGenre = async (id) => {
        try {
            await GenresRest.removeGenreById(id);
            setGenreErrors(null);
            fetchGenres();
        } catch (error) {
            setGenreErrors(error);
        }
    }

    const displayUpdateGenreForm = (genre) => {
        console.log("Coucou, je rentre ici et c'est normal", genre);
        setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.UPDATE);
        resetAddGenre();
        resetUpdateGenre({
            id: genre.id,
            name: genre.name
        });
    }

    const displayAddGenreForm = () => {
        resetUpdateGenre();
        setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.ADD);
    }

    const fetchGenres = async () => {
        try {
            const genresListe = await GenresRest.findAll();
            setGenres(genresListe);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchGenres();
        setGenresFormMode(LIBELLE.GENRE_FORM_LIBELLE.MODE.ADD);
    }, []);

    return (
        <div>
            <div className="container">
                {"<%- include('partials/navbar') %>"}
                <div className="row d-flex justify-content-center mt-5">
                    <h1 className="col-5">{LIBELLE.PAGE_TITLE}</h1>
                </div>
                {/* Section gestion des films */}
                <div className="row mt-5">
                    <h3 className="col-5 text-decoration-underline">{LIBELLE.TITLE_FILM_MANAGEMENT}</h3>
                </div>
                {"<% if(films.list.length> 0) { %>"}
                {"<% - include('partials/film-card') %>"}
                {" <% } %>"}
                <div id="filmForm" className="row mt-3">
                    {"<% if(films.displayModifyFilmForm) { %>"}
                    <form method="post" action="<%= `/${VIEW_LIBELLE.ADMINISTRATION}/${VIEW_LIBELLE.FILMS}/${films.filmToModify.id}` %>" className="row col-6">
                        <input type="hidden" name="id" value="<%= films.filmToModify.id %>" />
                        <div className="mb-3 col-8">
                            <label htmlFor="title" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.TITLE}</label>
                            <input type="text" className="form-control" id="title" name="title" />
                        </div>
                        <div className="mb-3 col-8">
                            <label htmlFor="genres" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.GENRE_SELECTION}</label>
                            <select className="form-select" id="genres" name="genres[]" multiple>
                                {"<% genres.list.forEach(genre=> { %>"}
                                {"<option value='<%= genre.id %>' <%=films.filmToModify.genres.includes(genre.name) ? 'selected' : ''"}
                                {" %>>"}
                                {"<%= genre.name %>"}
                                {"</option>"}
                                {"<% }) %>"}
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
                    {"<% } else { %>"}
                    <form method="post" action="<%= `/${VIEW_LIBELLE.ADMINISTRATION}/${VIEW_LIBELLE.FILMS}` %>" className="row col-6">
                        <div className="mb-3 col-8">
                            <label htmlFor="title" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.TITLE}</label>
                            <input type="text" className="form-control" id="title" name="title" />
                        </div>
                        <div className="mb-3 col-8">
                            <label htmlFor="genres" className="form-label">{LIBELLE.FILM_FORM_LIBELLE.GENRE_SELECTION}</label>
                            <select className="form-select" id="genres" name="genres[]" multiple>
                                {"<% genres.list.forEach(genre=> { %>"}
                                <option value="<%= genre.id %>">
                                    {"<%= genre.name %>"}
                                </option>
                                {"<% }) %>"}
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
                        <div>
                            <button type="submit" className="btn btn-primary w-50">{LIBELLE.FILM_FORM_LIBELLE.ADD_ACTION_BUTTON}</button>
                        </div>
                    </form>
                    {"<% } %>"}
                </div>
                {"<% if(error.filmError) { %>"}
                <div className="row mt-3">
                    <p>
                        {"<%= error.filmError %>"}
                    </p>
                </div>
                {"<% } %>"}
                {/*Section gestion des genres de film*/}
                <div className="row mt-5">
                    <h3 className="col-5 text-decoration-underline">{LIBELLE.GENRE_FORM_LIBELLE.FORM_TITLE}</h3>
                </div>
                <div className="row mt-3">
                    {
                        genres && genres.length > 0 ?
                            <ul id="liste-genre" className="list-group list-group-flush col-4">
                                {genres.map((genre) =>
                                    <li key={genre.id} className="list-group-item list-group-item-action d-flex justify-content-between">
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
                                { genreErrors }
                            </p>
                        </div> : null
                }
            </div>
        </div >
    )
}