// src/HelloPageOne.js
import React from 'react';
import './Home.css';

import BlogTopicCard from '../components/BlogTopicCard/BlogTopicCard';

import GithubSVG from '../Resources/SocialSVGs/GitHub.svg';
import BlogSVG from '../Resources/SocialSVGs/BlogSVG.svg';
import ProjectSVG from '../Resources/SocialSVGs/ProjectSVG.svg';

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
			<img id='Avatar' src='https://avatars.githubusercontent.com/u/94225856?v=4' alt='avatar'/>
			<h3 className='h3'>I invite you to explore my website to learn more about my journey in the world of programming.</h3>
			<h2 className='ul-title'>Get a glimpse of what i do!</h2>
			<div className='glimpse-div'>
				<a className='home-glimpse' href='/Blog'>
					<img width={80} src={BlogSVG}/>
					<h3>BLOG</h3>
					<p>Personal Blog to help others and share the fun of programming!</p>
				</a>
				<a className='home-glimpse' href='/Blog'>
					<img width={80} src={GithubSVG}/>
					<h3>GITHUB</h3>
					<p>Get a glipse of my code by diving into one ( or more 🙂) of my repositories!</p>
				</a>
				<a className='home-glimpse' href='/Blog'>
					<img width={80} src={ProjectSVG}/>
					<h3>PROJECTS</h3>
					<p>Coming soon!</p>
				</a>
			</div>
			<p className='p'>I'm passionate about programming, and I strive to learn something new every day!</p>
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
