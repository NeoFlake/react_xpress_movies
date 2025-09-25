import express from 'express';
import 'dotenv/config';
import session from "express-session";
import flash from "connect-flash";
import genres from "./routes/genres.route.js";
import films from "./routes/films.route.js";

const app = express();

// Configurer la session
app.use(session({
    secret: "express-ejs", 
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}));

// Utiliser le middleware body-parser
app.use(express.urlencoded({extended: true}));

app.use(flash());

app.use(express.static("public"));

const PORT = process.env.PORT || 5555;

// Mapping entre routes et le routeur
app.use("/genres", genres);
app.use("/films", films);
app.use("/users", users);
app.use("/favoris", favoris);

app.all("/*splat", (req, res) => {
    res
    .status(400)
    .end("Erreur appel API");
});

app.listen(PORT, () => {
    console.log(`Addresse serveur : http://localhost:${PORT}`);
});