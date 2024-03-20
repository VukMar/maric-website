import React from "react";

import './LoadingCard.css'

import LogoIcon from '../../Resources/MaricIcon.png';

function LoadingCard() {
    return (
        <div className="loading-card">
            <img className="loading-logo" src={LogoIcon} alt="logo-icon" />
            <div className="inner-div"></div>
        </div>
    )
}

export default LoadingCard;