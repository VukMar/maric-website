import React from "react";

import './socialIcon.css'

function SocialIcon ({href , icon, text}) {
    return(
        <a className="contact-social-icon" href={href} target='_blank' rel='noreferrer' >
			<img src={icon} alt='social-icon'/>
			{text}
		</a>
    )
}

export default SocialIcon;