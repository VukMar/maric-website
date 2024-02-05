// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import Home from './Home/Home';
import { AboutMe } from './AboutMe/AboutMe';
import ContactMe from './ContactMe/ContactMe';
import Blog from './Blog/Blog';
import TopicPage from './Blog/BlogTopicPage';
import DeezerCard from './components/DeezerCard';

import likedinSVG from './Resources/SocialSVGs/linkedin.svg';
import GitHubSVG from './Resources/SocialSVGs/GitHub.svg';

import Logo from './Resources/MaricLogo.png'
import LoadingScreen from './components/Loading';

import htmlSVG from './LangSVGs/html.svg';
import cssSVG from './LangSVGs/css.svg';
import jsSVG from './LangSVGs/JavaScript.svg';
import nodeJsSVG from './LangSVGs/nodeJs.svg';
import reactSVG from './LangSVGs/react.svg';
import phpSVG from './LangSVGs/php.svg';
import cppSVG from './LangSVGs/cpp.svg';
import NavBar from './components/NavBar/NavBar';

function App(){

	const listItemData = [
		{ id: 1, svgSrc: htmlSVG, text: 'HTML - Hyper Text Markup Language' },
		{ id: 2, svgSrc: cssSVG, text: 'CSS - Cascade Style Sheets' },
		{ id: 3, svgSrc: jsSVG, text: 'JavaScript' },
		{ id: 4, svgSrc: nodeJsSVG, text: 'nodeJs' },
		{ id: 5, svgSrc: reactSVG, text: 'React' },
		{ id: 6, svgSrc: phpSVG, text: 'PhP' },
		{ id: 7, svgSrc: cppSVG, text: 'C++' },
	];
  
  	
	const [TopicList, setTopicList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [LatestBlog, setLatestBlog] = useState(null);


	useEffect(() => {
		fetchTopics();
	}, [] );

	const topicRoutes = TopicList.map((topic, index) =>{
		return (
			<Route
			key={index}
			path={`Blog/${topic.title}`}
			element={<TopicPage topic={topic}/>}
			/>
		)
	})


	const fetchTopics = async () => {
		const response = await fetch('https://backend.vukmaric.rs/api/blog/GetBlogTopics.php')
		if (!response.ok) {
			throw new Error(`Failed to fetch topics. Status: ${response.status}`);
		}
	  
		const data = await response.json();
		setTopicList(data);
		data.forEach(el => {
			console.log(el.tags);
		});
		const latest = findLatestBlog(data);
		setLatestBlog(latest);
		setIsLoading(false);
	}

	function findLatestBlog(blogList) {
		if (!blogList || blogList.length === 0) {
		  	return null;
		}
		
		const sortedBlogs = blogList.sort((a, b) => {
		  	const dateA = parseDate(a.date);
		  	const dateB = parseDate(b.date);
	  
			return dateB - dateA;
		});
	  
		const latestBlog = sortedBlogs[0];
	  
		return latestBlog;
	}
	
	function parseDate(dateString) {
		const [day, month, year] = dateString.split('.').map(Number);
		return new Date(year, month - 1, day);
	}


  	return (
    <Router>
		<LoadingScreen Text={'Loading'} isLoading={isLoading}/>
      	<div className="app">
			<img className='MainLogo' src={Logo} alt='main-logo'/>
			<NavBar />
			

			<Routes>
				<Route path="/" element={<Home listItemData={listItemData} latestBlog={LatestBlog}/>} />
				<Route path="/AboutMe" element={<AboutMe listItemData={listItemData} />} />
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


