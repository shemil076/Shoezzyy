import { FC, ReactNode } from 'react';
import '../styles/RegularButton.css'; // You can create a CSS file for styling


interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    className?: string;
    isDisabled?: boolean;
    
}


const  Button: FC<ButtonProps> = ({ onClick, children, className, isDisabled }) => {
    return (
        <button className={`button ${className}`} onClick={onClick} disabled={isDisabled}>
            {children}
        </button>
    );
};

export default Button;