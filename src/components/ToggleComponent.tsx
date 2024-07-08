import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const ToggleComponent: React.FC = () => {
  const [toggleState, setToggleState] = useState<boolean>(false);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleState(event.target.value === 'true'); // Update the toggle state
  };

  return (
    <div>
      <h2>Toggle Example</h2>
      <RadioGroup
        aria-label="toggle example"
        name="toggle-example"
        value={toggleState.toString()}
        onChange={handleToggle}
        row
      >
        <FormControlLabel value="true" control={<Radio />} label="ON" />
        <FormControlLabel value="false" control={<Radio />} label="OFF" />
      </RadioGroup>
      {/* Example of conditional rendering based on toggleState */}
      {toggleState && <div>Toggle is ON!</div>}
    </div>
  );
};

export default ToggleComponent;
