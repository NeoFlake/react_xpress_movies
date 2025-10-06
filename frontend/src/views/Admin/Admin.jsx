import { LIBELLE } from "../../constantes/admin.constantes";
import "./Admin.css";
import GenresAdmin from "../../components/GenresAdmin/GenresAdmin.jsx";
import FilmsAdmin from "../../components/FilmsAdmin/FilmsAdmin.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";


export default function Admin() {

    return (
        <div>
            <div className="container">
                <Navbar></Navbar>
                <div className="row d-flex justify-content-center mt-5">
                    <h1 className="col-5">{LIBELLE.PAGE_TITLE}</h1>
                </div>
                <FilmsAdmin></FilmsAdmin>
                <GenresAdmin></GenresAdmin>
            </div>
        </div >
    )
}