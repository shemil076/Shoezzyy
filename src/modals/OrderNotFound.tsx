import React from "react";

import "../styles/ConfirmationModa.css"
import "../styles/RegularButton.css"
import Button from "../components/Button";
import Modal from "../components/Modal";
import "../styles/OrderNotFound.css"

interface OrderNotFoundModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderNotFoundModal: React.FC<OrderNotFoundModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen}
            onClose={onClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom" >
            <div>
                <div className="upper-container">
                    <img src="/assets/warning.png" alt="warnning" className="warning-image" />
                    <h3>404</h3>
                    <p>Order not found, recheck the job id!</p>
                </div>

               <div className="confirmation-button-section">
               <Button onClick={onClose} className="regular-black-button">Cancel</Button>

               </div>
            </div>
        </Modal>
    );
}

export default OrderNotFoundModal;