import { useEffect, useState } from "react";
import { LIBELLE } from "../../constantes/admin.constantes";
import { GenresRest } from "../../rest/genres.rest.Js";
import { FilmsRest } from "../../rest/films.rest.js";
import "./Admin.css";
import GenresAdmin from "../../components/GenresAdmin/GenresAdmin.jsx";
import FilmsAdmin from "../../components/FilmsAdmin/FilmsAdmin.jsx";

export default function Admin() {

    const [films, setFilms] = useState();
    const [genres, setGenres] = useState();

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

    // Méthode de chargement de la page

    const loadFilms = () => {
        fetchFilms();
    }

    const loadGenres = () => {
        fetchGenres();
    }

    // Chargement de la page

    useEffect(() => {
        loadFilms();
        loadGenres();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <h1 className="col-5">{LIBELLE.PAGE_TITLE}</h1>
                </div>
                <FilmsAdmin films={films} genres={genres} updatedFilms={loadFilms}></FilmsAdmin>
                <GenresAdmin genres={genres} updatedGenres={loadGenres} ></GenresAdmin>
            </div>
        </div >
    )
}