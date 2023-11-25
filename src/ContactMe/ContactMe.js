// src/ContactMe.js
import React, { useState } from 'react';

import './ContactMe.css';

import Logo from '../Resources/MaricLogo.png';
import HandwaveSVG from '../Resources/Hand-wave.svg';

import likedinSVG from '../Resources/SocialSVGs/linkedin.svg';
import GitHubSVG from '../Resources/SocialSVGs/GitHub.svg';
import SocialIcon from '../components/socialIcon';
import LoadingScreen from '../components/Loading';


const ContactMe = () => {
    
	const [Name, setName] = useState('');
  	const [Email, setEmail] = useState('');
  	const [isButtonEnabled, setIsButtonEnabled] = useState(false);
	const [SendingEmail, setSendingEmail] = useState({sending: false, sent: false, failed: false});

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

		setSendingEmail({sending: true, sent: false, failed: false});

		if (Name && Email) {
			const data = new FormData();
			data.append('name', Name);
			data.append('email', Email);

			try {
				const response = await fetch('https://backend.vukmaric.rs/api/email/SendEmail.php', {
				method: 'POST',
				body: data,
				});

				if (response.ok) {
				const result = await response.text();
				console.log(`Result received: ${result}`)
					if (result.trim() === 'success'){
						setSendingEmail({sending: false, sent: true, failed: false});
					} else {
						setSendingEmail({sending: false, sent: false, failed: true});
					}
				} else {
					setSendingEmail({sending: false, sent: false, failed: true});
				}
			} catch (error) {
				console.error('An error occurred:', error);
				setSendingEmail({sending: false, sent: false, failed: true});
			}
		}
		setName('');
		setEmail('');
	};
	
	const validateEmail = (email) => {
		return email.match(
		  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};
	  

    return (
        <div className='contact-me'>
				<LoadingScreen
					Text={'Trying to send email'} 
					isLoading={SendingEmail.sending}
				/>
				<LoadingScreen 
					isNotification={true} 
					Text={'Email sent!'} 
					isLoading={SendingEmail.sent}
					setIsLoading={() => setSendingEmail({sending: false, sent: false, failed: false})}
				/>
				<LoadingScreen 
					isNotification={true} 
					Text={'Email sending failed!'} 
					isLoading={SendingEmail.failed}
					setIsLoading={() => setSendingEmail({sending: false, sent: false, failed: false})}
				/>
			
			<h1>Send me a message!</h1>
			<div className={
					(SendingEmail.sending || SendingEmail.sent || SendingEmail.failed)? 'say-hello hidden' : 'say-hello'
				}>
				<div className='input-fields'>
					<label htmlFor='name'>Name</label>
					<input autoComplete='off' id='name' onInput={getName} type='text' ></input>
					<label htmlFor='email'>Email</label>
					<input id='email' onInput={getEmail}  type='email' autoComplete='off'></input>
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
