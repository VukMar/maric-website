// src/ContactMe.js
import React, { useState } from 'react';

import './ContactMe.css';

import Logo from './Resources/MaricLogo.png'
import HandwaveSVG from './Hand-wave.svg'

import likedinSVG from './SocialSVGs/linkedin.svg';
import GitHubSVG from './SocialSVGs/GitHub.svg';


const ContactMe = () => {
    
	const [buttonContent, setButtonContent] = useState('Run');
	const [Name, setName] = useState('');
  	const [Email, setEmail] = useState('');
  	const [isButtonEnabled, setIsButtonEnabled] = useState(false);

	const handleHover = () => {
		setButtonContent('Send Email');
	};
	
	const handleMouseLeave = () => {
		setButtonContent('Run');
	};

	const getName = (name) => {
		name.target.style.width = `${name.target.scrollWidth}px`;
		if(name.target.value === ''){
			name.target.style.width = `5px`;
		}
		setName(name.target.value === undefined ? '' : name.target.value);
    	updateButtonStatus(Name, Email);
	}
	const getEmail = (email) => {
		email.target.style.width = `${email.target.scrollWidth}px`;
		if(email.target.value === ''){
			email.target.style.width = `5px`;
		}
		setEmail(email.target.value === undefined ? '' : email.target.value);
    	updateButtonStatus(Name, Email);
	}

	const updateButtonStatus = (nameValue, emailValue) => {
		setIsButtonEnabled(nameValue !== '' && emailValue !== '');
	  };

	const sendEmail = async () => {

		console.log(`${Name} with email: ${Email} is trying to send email....`)
		if (Name && Email) {
		const data = new FormData();
		data.append('name', Name);
		data.append('email', Email);

		try {
			const response = await fetch('http://backend.vukmaric.rs/SendEmail.php', {
			method: 'POST',
			body: data,
			});

			if (response.ok) {
				console.log('Awaiting response text!')
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


    return (
        <div className='contact-me'>
			<code className='say-hello'>
				<ol>
					<li >
						<span className='code-comment'>//SendContactEmail.js</span>
					</li>
					<li className='input-li'>
						<span className='statement'>var</span><span className='object'> you</span> = 
						new <span className='object'>Object</span>();
					</li>
					<li className='input-li'>
						<span className='object'>you</span>.<span className='function'>name</span> = <span className='string'>'
						<input onChange={getName} type='text' ></input>'</span>;
					</li>
					<li className='input-li'>
						<span className='object'>you</span>.<span className='function'>email</span> = <span className='string'>'
						<input onChange={getEmail} type='email'></input>'</span>;
					</li>
					<li>
						<span className='statement'>if</span>(!<span className='object'>you</span>.<span className='function'>shy</span>()){'{'}
						{}
					</li>
					<li>
						<div className='say-hello-button'>
						<span className='object'>you</span>.<span className='function'>say</span>(<span className='string'>'Hello'</span>);
						</div>
					</li>
					<li>
						{'}'}
					</li>
				</ol>
				
				<button onClick={sendEmail} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} className='run-code-btn' disabled={!isButtonEnabled}>
					{isButtonEnabled ? buttonContent : 'Complete the code to run!'}
					<img src={HandwaveSVG} alt='Hand-wave'/>
				</button>
			</code>
			<div className='contact-social'>
			<img className='contact-logo' src={Logo} alt='logo-contact'/>
				<p>You can contact me directly using my email:</p>
				<p>vuk.s.maric@gmail.com</p>
				<p>Or find me on GitHub and LinkedIn!</p>
				<a href='https://www.linkedin.com/in/vuk-maric-50367124a/' target='_blank' rel='noreferrer' >
					<img src={likedinSVG} alt='social-icon'/>
					LinkedIn - Vuk Maric
				</a>
				<a href='https://github.com/VukMar' target='_blank' rel='noreferrer' >
					<img src={GitHubSVG} alt='social-icon'/>
					GitHub - @VukMar
				</a>
			</div>
        </div>
    );
};

export default ContactMe;
