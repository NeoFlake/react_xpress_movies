import yup from "../config/yup.config.js";

const updateProfileSchema = yup.object().shape({
    lastname: yup
        .string("Nom invalide")
        .required("Le nom est obligatoire pour modifier son compte")
        .matches(/^[A-Z]/, "Le nom doit commencer par une majuscule")
        .matches(/^[A-Z][a-zA-Z]{2,18}$/, "Le nom doit faire entre 3 et 19 caractères et ne contenir que des lettres"),

    firstname: yup
        .string("Prénom invalide")
        .required("Le prénom est obligatoire pour modifier son compte")
        .matches(/^[A-Z]/, "Le prénom doit commencer par une majuscule")
        .matches(/^[A-Z][a-zA-Z]{2,18}$/, "Le prénom doit faire entre 3 et 19 caractères et ne contenir que des lettres"),

    email: yup
        .string("Email invalide")
        .required("L'email est obligatoire pour modifier son compte")
        .matches(/[a-zA-Z0-9._%+-]+/, "L'email doit contenir uniquement des caractères valides avant le @")
        .matches(/@[a-zA-Z]+/, "L'email doit contenir un @ suivi d'un nom de domaine")
        .matches(/\.[a-zA-Z]+$/, "L'email doit se terminer par un domaine valide (.com, .fr, etc.)"),

    password: yup
        .string()
        .required("Le mot de passe est obligatoire pour modifier son compte")
        .min(10, "Le mot de passe doit contenir au moins 10 caractères")
        .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre")
        .matches(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),

    newPassword: yup
        .string()
        .nullable()
        .notRequired()
        .test(
            "password-rules",
            "Le nouveau mot de passe doit contenir au moins 10 caractères, une majuscule, un chiffre et un caractère spécial",
            (value) => {
                if (!value) return true; // ignoré si vide
                return (
                    value.length >= 10 &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value) &&
                    /[^a-zA-Z0-9]/.test(value)
                );
            }
        ),

    confirmPassword: yup
        .string()
        .nullable()
        .notRequired()
        .test(
            "password-rules",
            "La confirmation du mot de passe doit contenir au moins 10 caractères, une majuscule, un chiffre et un caractère spécial",
            (value) => {
                if (!value) return true; // ignoré si vide
                return (
                    value.length >= 10 &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value) &&
                    /[^a-zA-Z0-9]/.test(value)
                );
            }
        )
});

export default updateProfileSchema;