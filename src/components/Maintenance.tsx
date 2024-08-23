import '../styles/Maintenance.css'

const Maintenance: React.FC = () =>{
    return(
        <div className="maintenance-banner-container">
            <div className="maintenance-banner-content">
                <img src="/assets/wrench.png" alt="maintenance png" className='banner-img'/>
                <h3 className='banner-heading'>Site under maintenance</h3>
            </div>
        </div>
    );
};

export default Maintenance;
