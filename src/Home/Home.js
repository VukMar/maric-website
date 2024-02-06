// src/HelloPageOne.js
import React from 'react';
import './Home.css';

import { Link } from 'react-router-dom';
import BlogTopicCard from '../components/BlogTopicCard/BlogTopicCard';

const Home = ({latestBlog}) => {

  return (
	<div className="home">
		<div className='start-page'></div>
		<div className='home-content'>
			<div className='hello'>
				Hello my name is
				<div className='name'>
				</div>
			</div>
			<p className='p'>I'm passionate about programming, and I strive to learn something new every day!</p>
			<img id='Avatar' src='https://avatars.githubusercontent.com/u/94225856?v=4' alt='avatar'/>
			<p className='p'>I invite you to explore my website to learn more about my journey in the world of programming.</p>
			<label className='ul-title'>You can follow these links to get a glimpse of what i do:</label>
			<ul>
				<li>
					<Link to={'/Blog'}>BLOG</Link>
				</li>
				<li>
					<a className='link-span' target='_blank' href='https://github.com/VukMar' rel='noreferrer'>
						GitHub	
						- Discover my latest open source projects
					</a>
				</li>
			</ul>
			<h2 className='latest-blog-heading'>LATEST BLOG</h2>
			<div className='latest-blog-container'>
				{latestBlog !== null && latestBlog !== undefined?(
					<BlogTopicCard topic={latestBlog} id={1001} />
					) : (<></>)}
			</div>
		</div>
		<div className='end-page'></div>
	</div>
);
};

export default Home;
