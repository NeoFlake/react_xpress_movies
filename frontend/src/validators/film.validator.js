import yup from "../config/yup.config.js";

const filmSchema = yup.object().shape({
    title: yup
        .string("Titre invalide")
        .required("L'intitulé du film est obligatoire pour la validation")
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \-\/_]{3,200}$/, "Cet intitulé de genre n'est pas disponible"),

    genres: yup
        .array()
        .of(yup.number().required())
        .min(1, "Un genre minimum est obligatoire pour la validation")
        .required("Un genre minimum est obligatoire pour la validation"),

    poster: yup
        .string("Lien poster invalide")
        .required("L'affiche du film est obligatoire pour la validation")
        .matches(/^(https?:\/\/[^\s]+?\.(?:jpg|jpeg|png|gif|webp|svg))(?:\?.*)?$/i, "l'adresse de l'affiche n'est pas valide"),

    releaseDate: yup
        .date("Le format doit être au format date")
        .required("La date de sorti du film est obligatoire pour la validation"),

    description: yup
        .string("Pitch invalide")
        .required("Le pitch du film est obligatoire pour la validation")
});

export default filmSchema;