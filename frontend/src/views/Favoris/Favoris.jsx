import { useContext, useEffect, useState } from "react";
import { LIBELLES } from "../../constantes/favoris.constantes.js";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";
import FilmCard from "../../components/FilmCard/FilmCard.jsx";
import RemoveFavori from "../../components/modales/RemoveFavori/RemoveFavori.jsx";
import { FavorisRest } from "../../rest/favoris.rest.js";
import { useNavigate } from "react-router-dom";
import { ROAD } from "../../constantes/road.contantes.js";

export default function Favoris() {

    const { userLogged, updatedUser } = useContext(GlobalContext);

    const [filmToRemove, setFilmToRemove] = useState(null);
    const [errorFavori, setErrorFavori] = useState(null);

    const navigate = useNavigate();

    const openConfirmModale = (film) => {
        setFilmToRemove(film);
    }

    const remove = async (userId, filmId) => {
        try {
            await FavorisRest.remove({ userId, filmId });
            updatedUser();
            setFilmToRemove(null);
        } catch (error) {
            setFilmToRemove(null);
            setErrorFavori(error.message);
        }
    }

    useEffect(() => {
        if (userLogged?.favoris?.length === 0 || userLogged.favoris[0] === null) {
            navigate(`/${ROAD.HOMEPAGE}`);
        }
    }, [userLogged]);

    return (
        <div className="container">
            <RemoveFavori film={filmToRemove} userId={userLogged.id} onConfirm={remove} onClose={() => setFilmToRemove(null)}></RemoveFavori>
            <div className="row d-flex justify-content-center mt-5">
                <h1 className="col-3">{LIBELLES.TITLE}</h1>
            </div>
            {
                errorFavori && errorFavori !== "" &&
                <p>{errorFavori}</p>
            }
            { /** Zone d'apparition des films */
                userLogged.favoris && userLogged.favoris.length > 0 && userLogged.favoris[0] !== null ?
                    <div>
                        <FilmCard films={userLogged.favoris} userLogged={userLogged} onRemoveFavori={openConfirmModale}></FilmCard>
                    </div> :
                    null
            }
        </div>
    );
}