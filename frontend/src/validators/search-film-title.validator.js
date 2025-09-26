import yup from "../config/yup.config.js";

const searchByTitleSchema = yup.object().shape({
    title: yup
        .string("Titre invalide")
        .required("L'intitulé du film est obligatoire pour la validation")
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \-\/_]{3,200}$/, "Ce titre de film n'est pas disponible"),
});

export default searchByTitleSchema;