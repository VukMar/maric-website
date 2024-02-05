import React from "react";

import './BurgerButton.css';

const BurgerButton = ({handleExpanded, expanded, widnowWidth}) => {
    return(
        <button className={widnowWidth < 1000? "burger-button" : 'burger-button-inactive'} onClick={handleExpanded}>
            <div key={201} className={expanded? "line inactive" : "line"}></div>
            <div key={202} className={expanded? "line rotate" : "line"}></div>
            <div key={203} className={expanded? "line rotate" : "line"}></div>
        </button>
    )
};

export default BurgerButton;