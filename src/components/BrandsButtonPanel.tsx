import "../styles/BrandsButtonPanel.css";
import { useNavigate } from 'react-router-dom';
import Button from "./Button";


const BrandsButtonPanel: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="button-panel-container">
            <Button className="button-panel-item" onClick={() => navigate('/brand/ADIDAS')}>
                <>
                <img src="/assets/adidasLogo.svg" alt="Adidas Logo" />
                Adidas
                </>
            </Button>
            <Button className="button-panel-item" onClick={() => navigate('/brand/ALLSTARCONVERSE')}>
                <>
                <img src="/assets/ASCLogo.png" alt="All Star Converse Logo" />
                All Star Converse
                </>
            </Button>
            <Button className="button-panel-item" onClick={() => navigate('/brand/NEWBALANCE')}>
                <>
                <img src="/assets/NBLogo.svg" alt="New Balance Logo" />
                New Balance
                </>
            </Button>
            <Button className="button-panel-item" onClick={() => navigate('/brand/NIKE')}>
                <>
                <img src="/assets/nikeLogo.png" alt="Nike Logo" />
                Nike
                </>
            </Button>
            <Button className="button-panel-item" onClick={() => navigate('/brand/VANSOLDSKOOL')}>
                <>
                <img src="/assets/vansLogo.png" alt="Vans Old Skool Logo" />
                Vans Old Skool
                </>
            </Button>
            <Button className="button-panel-item" onClick={() => navigate('/brand/OTHER')}>
                <>
                <img src="/assets/other.png" alt="Vans Old Skool Logo" />
                Other
                </>
            </Button>
        </div>
    );
}

export default BrandsButtonPanel;
