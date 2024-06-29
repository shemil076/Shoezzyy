import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import '../styles/AddNewProduct.css';
import { ProductCategory, Brand } from '../types/enum';
import Button from '../components/Button';
import { Shoe } from '../types/types';


interface CreateOrderModalProps {
    isOpen: boolean;
    onClose?: () => void;
    shoe: Shoe;
    
}

const ProductDetailModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose, shoe }) => {


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom"
        >
          <div>
            
          </div>
        </Modal>
    );
};

export default ProductDetailModal;
