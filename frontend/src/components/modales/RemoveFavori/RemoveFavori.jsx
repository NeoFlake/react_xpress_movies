import { MODALE_LIBELLES } from "../../../constantes/favoris.constantes";
import "./RemoveFavori.css";

export default function RemoveFavori({ film, userId, onConfirm, onClose }) {

    if (!film) return null;

    return (
        <div className="react-modal-container" id="suppression-modale" tabIndex="-1">
            <div className="react-modal-dialog">
                <div className="react-modal-content">
                    <div className="react-modal-header">
                        <h1 className="react-modal-title fs-5">
                            {`${MODALE_LIBELLES.FIRST_PART_TITLE} ${film.title} ${MODALE_LIBELLES.SECOND_PART_TITLE}`}
                        </h1>
                        {/* Croix de fermeture */}
                        <button className="react-modal-close" onClick={onClose}>x</button>
                    </div>
                    {/* Corp de la modale */}
                    <div className="react-modal-body">
                        {`${MODALE_LIBELLES.FIRST_PART_BODY} ${film.title} ${MODALE_LIBELLES.SECOND_PART_TITLE}`}
                    </div>
                    <div className="react-modal-footer">
                        <button className="react-modal-btn react-modal-btn-danger" onClick={onClose}>{MODALE_LIBELLES.DECLINE_ACTION_BUTTON}</button>
                        <button id="confirm-suppression" className="react-modal-btn react-modal-btn-primary" onClick={() => onConfirm(userId, film.id)}>
                            {MODALE_LIBELLES.CONFIRM_ACTION_BUTTON}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}