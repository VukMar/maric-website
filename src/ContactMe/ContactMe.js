// src/ContactMe.js
import React, { useEffect, useState } from 'react';

import './ContactMe.css';

import HandwaveSVG from '../Resources/Hand-wave.svg';

import LoadingScreen from '../components/Loading';
import ContactMeSVG from '../Resources/ContactMe.svg';


const ContactMe = React.forwardRef((props, ref) => {
    
	const [UserInfo, setUserInfo] = useState({name: '', email: ''});
  	const [isButtonEnabled, setIsButtonEnabled] = useState(false);
	const [SendingEmail, setSendingEmail] = useState({sending: false, sent: false, failed: false});
	  
	const getValue = (e) => {
		const { name, value } = e.target;
		setUserInfo(prevState => ({ ...prevState, [name]: value }));
	}
		
	const validateEmail = (email) => {
		return email.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};
	
	useEffect(()=>{
		updateButtonStatus();
	}, [UserInfo])
	
	const updateButtonStatus = () => {
		const isEmailValid = validateEmail(UserInfo.email);
		setIsButtonEnabled(UserInfo.name !== '' && isEmailValid);
	};

	const sendEmail = async () => {

		setSendingEmail({sending: true, sent: false, failed: false});

		if (UserInfo.name != '' && validateEmail(UserInfo.email)) {
			const data = new FormData();
			data.append('name', UserInfo.name);
			data.append('email', UserInfo.email);

			try {
				const response = await fetch('https://backend.vukmaric.rs/api/email/SendEmail.php', {
				method: 'POST',
				body: data,
				});

				if (response.ok) {
				const result = await response.text();
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
		setUserInfo({name: '', email: ''});
	};

    return (
        <>
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
			
		<div 
			className={
				(SendingEmail.sending || SendingEmail.sent || SendingEmail.failed)? 
				'say-hello hidden' : 'say-hello'
			}
			id='contact-me'
			ref={ref}
		>
			<img width={100} src={ContactMeSVG} alt='mail'/>
			<h1>Send me a message!</h1>
			<div className='input-fields'>
				<label htmlFor='name'>Name</label>
				<input 
					value={UserInfo.name} 
					autoComplete='on' 
					name='name' 
					id='name' 
					onChange={(ev) => getValue(ev)} 
					type='text'
				/>
				<label 
					htmlFor='email'
				>
					Email
				</label>
				<input 
					id='email' 
					value={UserInfo.email} 
					onChange={(ev) => getValue(ev)} 
					name='email'  
					type='email' 
					autoComplete='on'
				/>
				<button 
					onClick={sendEmail} 
					className='run-code-btn' 
					disabled={!isButtonEnabled}
				>
					Say Hello
					<img src={HandwaveSVG} alt='Hand-wave'/>
				</button>
			</div>
		</div>
        </>
    );
});

export default ContactMe;
