import express from 'express';
import 'dotenv/config';
import genres from "./routes/genres.route.js";
import films from "./routes/films.route.js";
import users from "./routes/users.route.js";
import favoris from "./routes/favoris.route.js";
import ROAD_LIBELLE from "./constantes/roads.js";

const app = express();

// Utiliser le middleware body-parser
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5555;

// Mapping entre routes et le routeur
app.use(ROAD_LIBELLE.GENRES, genres);
app.use(ROAD_LIBELLE.FILMS, films);
app.use(ROAD_LIBELLE.USERS, users);
app.use(ROAD_LIBELLE.FAVORIS, favoris);

app.all(ROAD_LIBELLE.SPLAT, (req, res) => {
    res
    .status(400)
    .end("Erreur appel API");
});

app.listen(PORT, () => {
    console.log(`Addresse serveur : http://localhost:${PORT}`);
});