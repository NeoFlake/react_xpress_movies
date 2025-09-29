import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LIBELLE, ACCOUNT_MODE } from "../../constantes/account.constantes";
import { ROAD } from "../../constantes/road.contantes.js";
import { yupResolver } from '@hookform/resolvers/yup';
import { UsersRest } from "../../rest/users.rest.js";
import inscriptionSchema from "../../validators/inscription.validator.js";
import loginSchema from "../../validators/login.validator.js";
import "./Account.css";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";

export default function Account() {

  const { mode } = useParams();
  const navigate = useNavigate();

  const [pageTitle, setPageTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const { setUserLogged, setIsAuthenticated } = useContext(GlobalContext);

  // Gestion du formulaire d'inscription
  const {
    handleSubmit: handleSubmitInscription,
    register: registerInscription,
    reset: resetInscription,
    formState: { errors: errorsInscription }
  } = useForm({
    resolver: yupResolver(inscriptionSchema),
    mode: "onChange"
  });

  const sendInscription = async (data) => {
    try {
      await UsersRest.inscription(data);
      resetInscription();
      navigate(`/${ROAD.ACCOUNT}/${ACCOUNT_MODE.LOGIN}`);
    } catch (error) {
      resetLogin();
      setErrors([error]);
    }
  };

  // Gestion du formulaire de connexion
  const {
    handleSubmit: handleSubmitLogin,
    register: registerLogin,
    reset: resetLogin,
    formState: { errors: errorsLogin }
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange"
  });

  const sendLogin = async (data) => {
    try {
      const logged = await UsersRest.login(data);
      resetLogin();
      localStorage.setItem("isAuthenticated", true);
      const userLogged = {
        lastname: logged.lastname,
        firstname: logged.firstname,
        email: logged.email,
        favoris: logged.favoris,
        role: logged.role
      };
      localStorage.setItem("userLogged", JSON.stringify(userLogged));
      setIsAuthenticated(true);
      setUserLogged(userLogged);
      navigate(`/${ROAD.HOMEPAGE}`);
    } catch (error) {
      resetLogin();
      setErrors([error]);
    }
  };

  // Permet de mettre à jour le titre de la page lors de la connexion
  useEffect(() => {
    setPageTitle(mode == ACCOUNT_MODE.INSCRIPTION ? LIBELLE.INSCRIPTION_TITLE : LIBELLE.LOGIN_TITLE);
  }, [mode]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-4 d-flex justify-content-center">
          <h1 className="m-5">{pageTitle}</h1>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-4 d-flex justify-content-center">
          {
            mode == ACCOUNT_MODE.INSCRIPTION ?
              /* Formulaire d'inscription */
              <form method="post" className="row" onSubmit={handleSubmitInscription(sendInscription)}>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">{LIBELLE.FORM.LASTNAME}</label>
                  <input type="text" className="form-control" id="lastname" {...registerInscription("lastname")} />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">{LIBELLE.FORM.FIRSTNAME}</label>
                  <input type="text" className="form-control" id="firstname" {...registerInscription("firstname")} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">{LIBELLE.FORM.EMAIL}</label>
                  <input type="email" className="form-control" id="email" autoComplete="new-email" {...registerInscription("email")} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">{LIBELLE.FORM.PASSWORD}</label>
                  <input type="password" className="form-control" id="password" autoComplete="new-password" {...registerInscription("password")} />
                  <div id="emailHelp" className="form-text">{LIBELLE.FORM.PASSWORD_HELPER}</div>
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary w-50">{LIBELLE.INSCRIPTION_TITLE}</button>
                </div>
              </form> :
              /* Formulaire de connexion */
              <form method="post" className="row" onSubmit={handleSubmitLogin(sendLogin)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">{LIBELLE.FORM.EMAIL}</label>
                  <input type="email" className="form-control" id="email" {...registerLogin("email")} autoComplete="new-email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">{LIBELLE.FORM.PASSWORD}</label>
                  <input type="password" className="form-control" id="password" {...registerLogin("password")} autoComplete="new-password" />
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary w-50">{LIBELLE.LOGIN_TITLE}</button>
                </div>
              </form>
          }
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-4">
        <a className="col-6 text-center text-decoration-none" onClick={() => navigate(`/account/${mode == ACCOUNT_MODE.INSCRIPTION ? ACCOUNT_MODE.LOGIN : ACCOUNT_MODE.INSCRIPTION}`)}>
          {mode == ACCOUNT_MODE.INSCRIPTION ? LIBELLE.REDIRECT_TO_LOGIN : LIBELLE.REDIRECT_TO_INSCRIPTION}
        </a>
      </div>
      {/* Zone de gestion d'apparition des erreurs */}
      {
        errors.length > 0 ?
          <div className="row mt-3 d-flex justify-content-center">
            <ul className="col-5 p-0 text-center">
              {errors.map((error, index) => (
                <li key={index} className="mb-2" style={{ listStyle: 'none' }}>
                  <span className="text-danger">{error.message}</span>
                </li>
              ))}
            </ul>
          </div> : null
      }
    </div >
  );
}