import yup from "../config/yup.config.js";

const genreSchema = yup.object().shape({
    name: yup
        .string("Genre invalide")
        .required("L'intitulé du genre est obligatoire pour la validation")
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,64}$/, "Cet intitulé de genre n'est pas disponible")
});

export default genreSchema;