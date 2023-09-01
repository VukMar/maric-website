import React from 'react';
import './popup.css'; // Import your CSS file for styling

const Popup = ({text}) => {
  return (
    <div className="popup">
      {text}
    </div>
  );
};

export default Popup;