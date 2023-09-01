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
		<p>I'm passionate about programing and i try to learn every day!!</p>
		<p>Fell free to explore my website to learn more about me!<img src={SmileSVG}/></p>
	</div>
);
};

export default Home;
