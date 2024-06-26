import React, { FC, ReactNode } from 'react';
import '../styles/RegularButton.css'; // You can create a CSS file for styling


interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    className?: string;
}


const  Button: FC<ButtonProps> = ({ onClick, children, className }) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;