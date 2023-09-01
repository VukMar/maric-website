// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import Home from './Home';
import AboutMe from './AboutMe';
import ContactMe from './ContactMe';
import MyProjects from './MyProjects';

import HomeSVG from './Home.svg';
import AboutMeSVG from './AboutMe.svg';
import ContactMeSVG from './ContactMe.svg';
import MyProjectsSVG from './MyProjects.svg';

import likedinSVG from './SocialSVGs/linkedin.svg';
import GitHubSVG from './SocialSVGs/GitHub.svg';

import Logo from './Resources/MaricLogo.png'

function App(){
  
  	const [selectedLink, setSelectedLink] = useState(null);

	useEffect(() => {
		setSelectedLink(window.location.pathname);
	}, []);

  	const handleClicks = (link) =>{
		setSelectedLink(link);
  	}

  	return (
    <Router>
      	<div className="app">
			<img className='MainLogo' src={Logo}/>
			<nav id="nav">	
				<Link className={selectedLink === '/' ? 'selected' : ''} onClick={() => handleClicks('/')} to="/">
					<img className={selectedLink === '/' ? 'selected' : ''} src={HomeSVG} alt=""/>
					Home
				</Link>
				<Link className={selectedLink === '/AboutMe' ? 'selected' : ''} onClick={() => handleClicks('/AboutMe')} to="/AboutMe">
					<img className={selectedLink === '/AboutMe' ? 'selected' : ''} src={AboutMeSVG} alt=""/>
					About Me
					</Link>
				<Link className={selectedLink === '/ContactMe' ? 'selected' : ''} onClick={() => handleClicks('/ContactMe')} to="/ContactMe">
					<img className={selectedLink === '/ContactMe' ? 'selected' : ''} src={ContactMeSVG} alt=""/>
					Contact Me
					</Link>
				<Link className={selectedLink === '/MyProjects' ? 'selected' : ''} onClick={() => handleClicks('/MyProjects')} to="/MyProjects">
					<img className={selectedLink === '/MyProjects' ? 'selected' : ''} src={MyProjectsSVG} alt=""/>
					Projects
				</Link>
			</nav>

			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/AboutMe" element={<AboutMe />} />
				<Route path="/ContactMe" element={<ContactMe />} />
				<Route path="/MyProjects" element={<MyProjects />} />
			</Routes>

			<footer>
				<div className='name-logo'>
					<img className='MainLogo footer-logo' src={Logo}/>
					<p className='footer-name'>Vuk Maric 2023<span>Ⓒ</span></p>
					<img className='MainLogo footer-logo' src={Logo}/>
				</div>
				<div className='footer-links'>
					<ul className='footer-link-list'>
						Interesting websites:
						<li>
							<a className='footer-link' href='https://www.sololearn.com/' target='_blank' >
								SoloLearn
							</a>
						</li>
						<li>
							<a className='footer-link' href='https://chat.openai.com/' target='_blank'>
								ChatGPT
							</a>
						</li>
					</ul>
					<div className='social-media-links'>
						<a className='social-icon'>
							<img src={likedinSVG} alt='linkedin'/>
							Linkedin
						</a>
						<a className='social-icon'>
							<img src={GitHubSVG} alt='github'/>
							GitHub
						</a>
					</div>
				</div>
			</footer>
      	</div>
    </Router>
  );
}

export default App;


