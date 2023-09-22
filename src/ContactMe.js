// src/ContactMe.js
import React, { useState } from 'react';

import './ContactMe.css';

import Logo from './Resources/MaricLogo.png'
import HandwaveSVG from './Hand-wave.svg'

import likedinSVG from './SocialSVGs/linkedin.svg';
import GitHubSVG from './SocialSVGs/GitHub.svg';
import SocialIcon from './socialIcon';


const ContactMe = () => {
    
	const [Name, setName] = useState('');
  	const [Email, setEmail] = useState('');
  	const [isButtonEnabled, setIsButtonEnabled] = useState(false);

	const getName = (name) => {
		setName(name.target.value === undefined ? '' : name.target.value);
    	updateButtonStatus(Name, Email);
	}
	const getEmail = (email) => {
		validateEmail(email.target.value)? setEmail(email.target.value) : setEmail('');
    	updateButtonStatus(Name, Email);
	}

	const updateButtonStatus = (nameValue, emailValue) => {
		setIsButtonEnabled(nameValue !== '' && emailValue !== '');
	  };

	const sendEmail = async () => {

		if (Name && Email) {
		const data = new FormData();
		data.append('name', Name);
		data.append('email', Email);

		try {
			const response = await fetch('http://backend.vukmaric.rs/api/email/SendEmail.php', {
			method: 'POST',
			body: data,
			});

			if (response.ok) {
			const result = await response.text();
			console.log(`Result received: ${result}`)
				if (result.trim() === 'success'){
					// Do something for success
					console.log('Email sent successfully!');
				} else {
					// Do something for failure
					console.log('Email sending failed.');
				}
			} else {
			console.error('Email sending failed.');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
		}
	};
	
	const validateEmail = (email) => {
		return email.match(
		  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};
	  

    return (
        <div className='contact-me'>
				<h1>Send me a message!</h1>
			<div className='say-hello'>
				<div className='input-fields'>
					<label htmlFor='name'>Name</label>
					<input id='Name' onChange={getName} type='text' ></input>
					<label htmlFor='email'>Email</label>
					<input id='email' onChange={getEmail} type='email'></input>
					<button onClick={sendEmail} className='run-code-btn' disabled={!isButtonEnabled}>
						Say Hello
						<img src={HandwaveSVG} alt='Hand-wave'/>
					</button>
					<img className='contact-logo' src={Logo} alt='logo-contact'/>
				</div>
			</div>
			<div className='contact-social'>
				<div className='contact-info'>
					<p>You can contact me directly using my email:</p>
					<code>vuk.s.maric@gmail.com</code>
				</div>
				<div className='contact-info'>
					<p>Find me on GitHub and LinkedIn!</p>
					<SocialIcon href={'https://www.linkedin.com/in/vuk-maric-50367124a/'} icon={likedinSVG} text={'LinkedIn - Vuk Maric'}/>
					<SocialIcon href={'https://github.com/VukMar'} icon={GitHubSVG} text={'GitHub - @VukMar'}/>
				</div>
			</div>
        </div>
    );
};

export default ContactMe;
