// src/App.js
import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';

import Home from './Home/Home';
import { AboutMe } from './AboutMe/AboutMe';
import Blog from './Blog/Blog';
import TopicPage from './Blog/BlogTopicPage';
import DeezerCard from './components/DeezerCard';

import likedinSVG from './Resources/SocialSVGs/linkedin.svg';
import GitHubSVG from './Resources/SocialSVGs/GitHub.svg';

import LoadingScreen from './components/Loading';

import htmlSVG from './LangSVGs/html.svg';
import cssSVG from './LangSVGs/css.svg';
import jsSVG from './LangSVGs/JavaScript.svg';
import nodeJsSVG from './LangSVGs/nodeJs.svg';
import reactSVG from './LangSVGs/react.svg';
import phpSVG from './LangSVGs/php.svg';
import cppSVG from './LangSVGs/cpp.svg';
import NavBar from './components/NavBar/NavBar';
import Projects from './Projects/Projects';

import {sortByDate, sortByViews} from './logic/sorting';

function App(){

	const listItemData = [
		{ id: 1, svgSrc: htmlSVG, text: 'HTML - Markup Language' },
		{ id: 2, svgSrc: cssSVG, text: 'CSS - Style Sheets' },
		{ id: 3, svgSrc: jsSVG, text: 'JS - Programming Language' },
		{ id: 4, svgSrc: nodeJsSVG, text: 'Node.js - JavaScript Runtime' },
		{ id: 5, svgSrc: reactSVG, text: 'React.js - JavaScript Library' },
		{ id: 6, svgSrc: phpSVG, text: 'PHP - Server-side Language' },
		{ id: 7, svgSrc: cppSVG, text: 'C++ - Programming Language' },
	];

	const [TopicList, setTopicList] = useState([]);
	const [PopularBlogs, setPopularBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [LatestBlog, setLatestBlog] = useState(null);


	useEffect(() => {
		fetchTopics();
	}, [] );

	const topicRoutes = TopicList.map((topic, index) =>{
		return (
			<Route
			key={index}
			path={`Blog/${topic.id}`}
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
		let thisRoutes = ['/', '/AboutMe', '/Blog', '/Projects'];
		data.forEach(el => {
			thisRoutes.push(`/Blog/${el.id}`);
		})
		setTopicList(data);
		findLatestBlog(data);
		getPopularBlogs(data);
		setIsLoading(false);
	}

	function findLatestBlog(topicList) {
		const sortedBlogs = sortByDate(topicList);
		setLatestBlog(sortedBlogs[0]);
	}

	function getPopularBlogs(topicList){
		const sortedBlogs = sortByViews(topicList);
		let popular = [];
		if(sortedBlogs.length < 3){
			sortedBlogs.forEach(el => {
				popular.push(el);
			});
		}else{
			for(let i = 0; i < 3; i++){
				popular.push(sortedBlogs[i]);
			}
		}
		setPopularBlogs(popular);
	}


  	return (
    <Router>
		<LoadingScreen Text={'Loading'} isLoading={isLoading}/>
      	<div className="app">

			<NavBar />

			<Routes>
				<Route path="/" element={<Home popularBlogs={PopularBlogs} latestBlog={LatestBlog}/>} />
				<Route path="/AboutMe" element={<AboutMe listItemData={listItemData} />} />
				<Route path="/Blog" element={<Blog  topicList={TopicList}/>}/>
				<Route path="/Projects" element={<Projects/>}/>
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


