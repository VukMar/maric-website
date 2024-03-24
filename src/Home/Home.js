// src/HelloPageOne.js
import React, { useRef, useState, useEffect } from 'react';
import './Home.css';

import BlogTopicCard from '../components/BlogTopicCard/BlogTopicCard';

import GithubSVG from '../Resources/SocialSVGs/GitHub.svg';
import BlogSVG from '../Resources/SocialSVGs/BlogSVG.svg';
import ProjectSVG from '../Resources/SocialSVGs/ProjectSVG.svg';
import ContactMe from '../ContactMe/ContactMe';

const Home = ({latestBlog, popularBlogs}) => {

	const AvatarRef = useRef(null);
	const AvatarImgRef = useRef(null);
	
	function createAvatarStyle(){
		let offset = 25;
		const random = (min, max) => Math.floor(min + Math.random() * (max - min));
		const remain = (n) => 100 - n;
		let r = [];
		for (let i = 0; i < 4; i++) {
			let n = random(offset, remain(offset));
			r.push(n);
			r.push(remain(n));
		}

		let coordinates = `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[6]}% ${r[7]}% ${r[5]}%`;
		if(AvatarRef && AvatarRef !== null && AvatarRef !== undefined){
			AvatarRef.current.style.borderRadius = coordinates;
		}
		if(AvatarImgRef && AvatarImgRef !== null && AvatarImgRef !== undefined){
		}
	}

	useEffect(() => {

		const interval = setInterval(createAvatarStyle, 2000);
	
		return () => clearInterval(interval);
	  }, []);

	return (
		<div className="home">
			<div className='start-page'></div>
			<div className='home-content'>
				<div className='home-heading-container'>
					<img id='home-avatar' ref={AvatarRef} src='https://avatars.githubusercontent.com/u/94225856?v=4' alt='avatar'/>
					<div className='hello'>
						Hello my name is
						<div className='name'>
						</div>
					</div>
				</div>
				<h3 className='h3'>I invite you to explore my website to learn more about my journey in the world of programming.</h3>
				<h2>Get a glimpse of what i do!</h2>
				<div className='glimpse-div'>
					<a className='home-glimpse' href='/Blog'>
						<img width={80} src={BlogSVG}/>
						<h3>BLOG</h3>
						<p>Personal Blog to help others and share the fun of programming!</p>
					</a>
					<a className='home-glimpse' href='https://github.com/VukMar' rel='noreferrer' target='_blank'>
						<img width={80} src={GithubSVG}/>
						<h3>GITHUB</h3>
						<p>Get a glipse of my code by diving into one ( or more 🙂) of my repositories!</p>
					</a>
					<a className='home-glimpse' href='/Projects'>
						<img width={80} src={ProjectSVG}/>
						<h3>PROJECTS</h3>
						<p>Explore a collection of projects crafted by me, showcasing the diverse technologies employed in their development.</p>
					</a>
				</div>
				<p className='p'>I'm passionate about programming, and I strive to learn something new every day!</p>
				<h2 className='home-content-heading'>LATEST BLOG</h2>
				<div className='latest-blog-container'>
					{latestBlog !== null && latestBlog !== undefined?(
						<>
						<BlogTopicCard topic={latestBlog} id={1001} />
						</>
						) : (<></>)}
				</div>
				<h2 className='home-content-heading'>POPULAR BLOGS</h2>
				<div className='popular-blogs-container'>
					{popularBlogs.length !== 0? (
						popularBlogs.map((el,index) => (
							<BlogTopicCard key={index} topic={el} id={200+index}/>
						))
					) : (<></>)}
				</div>
				<ContactMe />
			</div>
			<div className='end-page'></div>
		</div>
	);
};

export default Home;
