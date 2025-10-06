import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LIBELLE } from "../../constantes/account.constantes";
import { LIBELLES } from "../../constantes/profile.constantes";
import { GlobalContext } from "../../contexts/GlobalContext";
import updateProfileSchema from "../../validators/update-profile.validator";
import { yupResolver } from '@hookform/resolvers/yup';
import { UsersRest } from "../../rest/users.rest.js";
import RemoveUser from "../../components/modales/RemoveUser/RemoveUser.jsx";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { ROAD } from "../../constantes/road.contantes.js";
import Navbar from "../../components/Navbar/Navbar.jsx";

export default function Profile() {

    const { userLogged, updatedUser } = useContext(GlobalContext);

    const [ showModal, setShowModal ] = useState(false);

    const navigate = useNavigate();

    // Gestion du formulaire d'inscription
    const {
        handleSubmit: handleSubmitRegisterUpdate,
        register: registerUpdate,
        reset: resetRegisterUpdate,
        formState: { errors: errorsRegisterUpdate }
    } = useForm({
        resolver: yupResolver(updateProfileSchema),
        mode: "onChange"
    });

    const sendRegisterUpdate = async (data) => {
        try {
            data.id = userLogged.id;
            await UsersRest.updateById(userLogged.id, data);
            updatedUser();
            resetForm();
        } catch (error) {
            resetForm();
            console.log(error.message);
        }
    };

    const resetForm = () => {
        resetRegisterUpdate({
            lastname: userLogged.lastname,
            firstname: userLogged.firstname,
            email: userLogged.email,
            password: null,
            newPassword: null,
            confirmPassword: null
        });
    }

    const remove = async () => {
        await UsersRest.removeById(userLogged.id);
        localStorage.removeItem("userLogged");
        localStorage.removeItem("isAuthenticated");
        navigate(`/${ROAD.ACCOUNT}/${ROAD.INSCRIPTION}`);
    }

    useEffect(() => {
        resetForm();
    }, [userLogged]);

    return (
        <div className="container">
            <Navbar></Navbar>
            <RemoveUser isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={remove}>
            </RemoveUser>
            <div className="row d-flex justify-content-center">
                <h1 className="col-3">{LIBELLES.TITLE}</h1>
            </div>
            <div className="row">
                <h3 className="mt-5 mb-4 text-decoration-underline">{LIBELLES.UPDATE_FORM_TITLE}</h3>
                <form method="post" onSubmit={handleSubmitRegisterUpdate(sendRegisterUpdate)} className="col-4">
                    <div className="mb-3">
                        <label htmlFor="lastname" className="form-label">{LIBELLE.FORM.LASTNAME}</label>
                        <input type="text" className="form-control" id="lastname" {...registerUpdate("lastname")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">{LIBELLE.FORM.FIRSTNAME}</label>
                        <input type="text" className="form-control" id="firstname" {...registerUpdate("firstname")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">{LIBELLE.FORM.EMAIL}</label>
                        <input type="email" className="form-control" id="email" autoComplete="new-email" {...registerUpdate("email")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">{LIBELLE.FORM.PASSWORD}</label>
                        <input type="password" className="form-control" id="password" autoComplete="new-password" {...registerUpdate("password")} />
                        <div id="emailHelp" className="form-text">{LIBELLES.ACTUAL_PASSWORD_HELPER}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">{LIBELLES.NEW_PASSWORD}</label>
                        <input type="password" className="form-control" id="newPassword" {...registerUpdate("newPassword")} />
                        <div id="emailHelp" className="form-text">{LIBELLES.NEW_PASSWORD_HELPER}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">{LIBELLES.CONFIRM_NEW_PASSWORD}</label>
                        <input type="password" className="form-control" id="confirmPassword" {...registerUpdate("confirmPassword")} />
                        <div id="emailHelp" className="form-text">{LIBELLES.CONFIRM_NEW_PASSWORD_HELPER}</div>
                    </div>
                    <div className="text-center mt-3 row d-flex justify-content-center">
                        <button className="btn btn-danger col-5 me-3" onClick={() => resetForm()} >{LIBELLES.CANCEL_ACTION}</button>
                        <button type="submit" className="btn btn-primary col-5">{LIBELLES.UPDATE_ACTION}</button>
                    </div>
                </form>
            </div>
            <div className="row mt-5">
                <button className="btn btn-danger col-4" onClick={() => setShowModal(true)}>{LIBELLES.DELETE_ACTION}</button> {/** Créer la modale de confirmation de destruction du compte */}
            </div>
        </div>
    );
}