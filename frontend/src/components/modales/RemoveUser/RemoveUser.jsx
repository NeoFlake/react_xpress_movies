import { MODALE_LIBELLES } from "../../../constantes/profile.constantes";

export default function RemoveUser({ isOpen, onClose, onConfirm }) {

    if (!isOpen) return null;

    return (

        <div className="react-modal-container">
            <div className="react-modal-dialog">
                <div className="react-modal-content">
                    <div className="react-modal-header">
                        <h1 className="react-modal-title">{MODALE_LIBELLES.TITLE}</h1>
                        <button
                            type="button"
                            className="react-modal-close"
                            onClick={onClose}
                            aria-label="Fermer"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="react-modal-body">{MODALE_LIBELLES.BODY}</div>
                    <div className="react-modal-footer">
                        <button
                            type="button"
                            className="react-modal-btn react-modal-btn-danger"
                            onClick={onClose}
                        >
                            {MODALE_LIBELLES.DECLINE_ACTION_BUTTON}
                        </button>
                        <button
                            type="button"
                            className="react-modal-btn react-modal-btn-primary"
                            onClick={onConfirm}
                        >
                            {MODALE_LIBELLES.CONFIRM_ACTION_BUTTON}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );

}