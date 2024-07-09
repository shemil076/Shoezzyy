import React, { useState } from "react";
import { Brand } from "../types/enum";
import "../styles/SubNavBar.css";
import { getReadableBrandName } from "../utils/helperFunctions";

interface SubNavBarProps {
  selection: (category: Brand | string) => void;
}

const SubNavBar: React.FC<SubNavBarProps> = ({ selection }) => {
  const [selectedItem, setSelectedItem] = useState<string | Brand>("");

  const handleSelection = (category: string | Brand) => {
    setSelectedItem(category);
    selection(category);
  };

  return (
    <div className="sub-nav-container">
      <div
        className={`sub-nav-item ${selectedItem === "topPicks" ? "selected" : ""}`}
        onClick={() => handleSelection("topPicks")}
      >
        Top Picks
      </div>
      <div
        className={`sub-nav-item ${selectedItem === Brand.NIKE ? "selected" : ""}`}
        onClick={() => handleSelection(Brand.NIKE)}
      >
        {getReadableBrandName(Brand.NIKE)}
      </div>
      <div
        className={`sub-nav-item ${selectedItem === Brand.ADIDAS ? "selected" : ""}`}
        onClick={() => handleSelection(Brand.ADIDAS)}
      >
        {getReadableBrandName(Brand.ADIDAS)}
      </div>
      <div
        className={`sub-nav-item ${selectedItem === Brand.ALLSTARCONVERSE ? "selected" : ""}`}
        onClick={() => handleSelection(Brand.ALLSTARCONVERSE)}
      >
        {getReadableBrandName(Brand.ALLSTARCONVERSE)}
      </div>
      <div
        className={`sub-nav-item ${selectedItem === Brand.NEWBALANCE ? "selected" : ""}`}
        onClick={() => handleSelection(Brand.NEWBALANCE)}
      >
        {getReadableBrandName(Brand.NEWBALANCE)}
      </div>
      <div
        className={`sub-nav-item ${selectedItem === Brand.VANSOLDSKOOL ? "selected" : ""}`}
        onClick={() => handleSelection(Brand.VANSOLDSKOOL)}
      >
        {getReadableBrandName(Brand.VANSOLDSKOOL)}
      </div>
    </div>
  );
};

export default SubNavBar;
