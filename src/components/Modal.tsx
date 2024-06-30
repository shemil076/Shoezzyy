import React, { ReactNode } from 'react';
import '../styles/Modal.css';

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
    <div className={`modal-overlay ${overlayClassName}`} onClick={onClose}>
      <div className={`modal-content ${contentClassName}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
