// src/HelloPageOne.js
import React from 'react';
import './Home.css';

import SmileSVG from './Smile.svg'

const Home = () => {
  return (
	<div className="home">
		<div className='hello'>
			Hello my name is
			<div className='name'>
			</div>
		</div>
		<p>I'm passionate about programming, and I strive to learn something new every day!</p>
		<p>I invite you to explore my website to learn more about my journey in the world of programming.</p>
		<p>Discover my latest projects, visit my <a className='link-span' target='_blank' href='https://github.com/VukMar' rel='noreferrer'>GitHub</a>, and get a glimpse into my coding adventures.</p>

		<p>Ready to dive in? Just click on one of the links in navigation menu to start exploring!<img src={SmileSVG} alt='smile'/></p>
	</div>
);
};

export default Home;
