import { createContext, useState, useEffect } from "react";
import { GenresRest } from "../rest/genres.rest.js";
import { FilmsRest } from "../rest/films.rest.js";
import { UsersRest } from "../rest/users.rest.js";
import { LIBELLE } from "../constantes/admin.constantes.js";

export const GlobalContext = createContext();

export const Provider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false || localStorage.getItem("isAuthenticated"));

    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filmsFormMode, setFilmsFormMode] = useState(LIBELLE.FILM_FORM_LIBELLE.MODE.ADD);
    const [filmToEdit, setFilmToEdit] = useState(null);

    const [userLogged, setUserLogged] = useState(JSON.parse(localStorage.getItem("userLogged")) || {
        id: 0,
        lastname: "",
        firstname: "",
        email: "",
        role: "",
        favoris: [],
    });

    const updateFilm = (film) => {
        setFilmToEdit(film);
        setFilmsFormMode(LIBELLE.FILM_FORM_LIBELLE.MODE.UPDATE);
    };

    const addFilm = () => {
        setFilmToEdit(null);
        setFilmsFormMode(LIBELLE.FILM_FORM_LIBELLE.MODE.ADD);
    };

    const fetchFilms = async () => {
        try {
            const filmsListe = await FilmsRest.findAll();
            setFilms(filmsListe);
        } catch (error) {
            setFilmsErrors(error);
        }
    };

    const fetchGenres = async () => {
        try {
            const genresListe = await GenresRest.findAll();
            setGenres(genresListe);
        } catch (error) {
            setGenreErrors(error.message);
        }
    };

    const fetchUser = async () => {
        try {
            const user = await UsersRest.findById(userLogged.id);
            localStorage.setItem("userLogged", JSON.stringify(user));
            setUserLogged(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    const updatedGenres = () => {
        fetchGenres();
    };

    const updatedFilms = () => {
        fetchFilms();
    };

    const updatedUser = () => {
        fetchUser();
    }

    useEffect(() => {
        fetchFilms();
        fetchGenres();
    }, []);

    return (
        <GlobalContext.Provider value={{
            userLogged, setUserLogged,
            isAuthenticated, setIsAuthenticated,
            films, genres, updatedGenres, updatedFilms, updatedUser,
            filmsFormMode, filmToEdit, updateFilm, addFilm, setFilmsFormMode
        }}>
            {children}
        </GlobalContext.Provider>
    )
}