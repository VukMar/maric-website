// src/HelloPageOne.js
import React from 'react';
import './Home.css';

import SmileSVG from '../Resources/Smile.svg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
	<div className="home">
		<h1>WELCOME</h1>
		<img src='https://ychef.files.bbci.co.uk/1920x640/p0brm495.jpg' className='home-img'></img>
		<div className='home-content'>
			<div className='hello'>
				Hello my name is
				<div className='name'>
				</div>
			</div>
			<p>I'm passionate about programming, and I strive to learn something new every day!</p>
			<p>I invite you to explore my website to learn more about my journey in the world of programming.</p>
			<label className='ul-title'>You can follow these links to get a glimpse of what i do:</label>
			<ul>
				<li>
					<Link to={'/Blog'}>BLOG</Link>
				</li>
				<li>
					<a className='link-span' target='_blank' href='https://github.com/VukMar' rel='noreferrer'>
						GitHub	
						- Discover my latest projects
					</a>
				</li>
			</ul>
			<p>
				Ready to dive in? Just click on one of the links in navigation menu to start exploring!
			</p>
			<img width={100} src={SmileSVG} alt='smile'/>
		</div>
		<div className='end-page'></div>
	</div>
);
};

export default Home;
