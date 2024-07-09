import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import "../styles/ConfirmationModal.css"
import "../styles/RegularButton.css"

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClick: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onClick }) => {
    const handleDelete = () => {
        onClick();
        onClose();
    }
    return (
        <Modal isOpen={isOpen}
            onClose={onClose}
            overlayClassName="confirmModal-overlay-custom"
            contentClassName="confirmModal-content-custom" >
            <div>
                <div>
                    <img src="/assets/warning.png" alt="warnning" className="warning-image" />
                    <h3>Are you sure?</h3>
                    <p>You will not be able to undo this action if you proceed!</p>
                </div>

               <div className="confirmation-button-section">
               <Button onClick={onClose} className="regular-black-button">Cancel</Button>

<Button onClick={handleDelete} className="regular-black-button">Proceed</Button>
               </div>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;