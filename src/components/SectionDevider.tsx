import "../styles/SectionDevider.css"

interface SectionDeviderProps {
  title : string;
  subtitle : string;
};

const SectionDevider: React.FC<SectionDeviderProps> = ({title, subtitle}) => {
    return (
        <div className="section">
          <div className="line"></div>
          <div className="titleWrapper">
            <h1 className="title">{title}</h1>
            <p className="subtitle">{subtitle}</p>
          </div>
          <div className="line"></div>
        </div>
      );
};

export default SectionDevider;