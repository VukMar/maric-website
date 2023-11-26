// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import Home from './Home/Home';
import AboutMe from './AboutMe/AboutMe';
import ContactMe from './ContactMe/ContactMe';
import Blog from './Blog/Blog';
import TopicPage from './Blog/BlogTopicPage';
import DeezerCard from './components/DeezerCard';

import HomeSVG from './Resources/Home.svg';
import AboutMeSVG from './Resources/AboutMe.svg';
import ContactMeSVG from './Resources/ContactMe.svg';
import MyProjectsSVG from './Resources/Blog.svg';

import likedinSVG from './Resources/SocialSVGs/linkedin.svg';
import GitHubSVG from './Resources/SocialSVGs/GitHub.svg';

import Logo from './Resources/MaricLogo.png'
import LoadingScreen from './components/Loading';

function App(){
  
  	const [selectedLink, setSelectedLink] = useState(null);
	const [TopicList, setTopicList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		setSelectedLink(window.location.pathname);
		fetchTopics();
	}, [] );

  	const handleClicks = (link) =>{
		setSelectedLink(link);
  	}

	const topicRoutes = TopicList.map((topic, index) =>{
		return (
			<Route
			key={index}
			path={`Blog/${topic.title}`}
			element={<TopicPage topic={topic}/>}
			/>
		)
	})


	function fetchTopics(){
		fetch('https://backend.vukmaric.rs/api/blog/GetBlogTopics.php')
		.then(response => {
			if(response.ok){
				return response.json();
			}else{
				throw new Error('Network response not ok!');
			}
		})
		.then(data => {
			setTopicList(data);
			setIsLoading(false);
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
	}


  	return (
    <Router>
		<LoadingScreen Text={'Loading'} isLoading={isLoading}/>
      	<div className="app">
			<img className='MainLogo' src={Logo} alt='main-logo'/>
			<nav id="nav">	
				<Link className={selectedLink === '/' ? 'selected' : ''} onClick={() => handleClicks('/')} to="/">
					<img className={selectedLink === '/' ? 'selected' : ''} src={HomeSVG} alt="nav-icon"/>
					Home
				</Link>
				<Link className={selectedLink === '/AboutMe' ? 'selected' : ''} onClick={() => handleClicks('/AboutMe')} to="/AboutMe">
					<img className={selectedLink === '/AboutMe' ? 'selected' : ''} src={AboutMeSVG} alt="nav-icon"/>
					About Me
					</Link>
				<Link className={selectedLink === '/ContactMe' ? 'selected' : ''} onClick={() => handleClicks('/ContactMe')} to="/ContactMe">
					<img className={selectedLink === '/ContactMe' ? 'selected' : ''} src={ContactMeSVG} alt="nav-icon"/>
					Contact Me
					</Link>
				<Link className={selectedLink === '/Blog' ? 'selected' : ''} onClick={() => handleClicks('/Blog')} to="/Blog">
					<img className={selectedLink === '/Blog' ? 'selected' : ''} src={MyProjectsSVG} alt="nav-icon"/>
					Blog
				</Link>
			</nav>

			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/AboutMe" element={<AboutMe />} />
				<Route path="/ContactMe" element={<ContactMe />} />
				<Route path="/Blog" element={<Blog  topicList={TopicList}/>}/>
				{topicRoutes}
			</Routes>

			<footer>
				<DeezerCard/>
				<div className='footer-links'>
					<ul className='footer-link-list'>
					Interesting websites:
						<li>
							<a className='footer-link' href='https://www.sololearn.com/' target='_blank' rel='noreferrer' >
								SoloLearn
							</a>
						</li>
						<li>
							<a className='footer-link' href='https://chat.openai.com/' target='_blank' rel='noreferrer'>
								ChatGPT
							</a>
						</li>
						<li>
							<a className='footer-link' href='https://www.codewars.com/users/VukMar' target='_blank' rel='noreferrer'>
								CodeWars
							</a>
						</li>
					</ul>
					<div className='social-media-links'>
						<a className='social-icon' href='https://www.linkedin.com/in/vuk-maric-50367124a/' target='_blank' rel='noreferrer'>
							<img src={likedinSVG} alt='linkedin'/>
							Linkedin
						</a>
						<a className='social-icon' href='https://github.com/VukMar' target='_blank' rel='noreferrer'>
							<img src={GitHubSVG} alt='github'/>
							GitHub
						</a>
					</div>
				</div>
				<p className='footer-name'>Vuk Maric 2023<span>Ⓒ</span></p>
			</footer>
      	</div>
    </Router>
  );
}

export default App;


