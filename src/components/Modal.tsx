import React, { ReactNode } from 'react';
import '../styles/Modal.css'; // You can style your modal in this CSS file

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  overlayClassName = '',
  contentClassName = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${overlayClassName}`}>
      <div className={`modal-content ${contentClassName}`}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
