// src/HelloPageOne.js
import React, { useState } from 'react';
import { useEffect } from 'react';

import './AboutMe.css';

import ListItem from './ListItem';

import PlanetSVG from '../Resources/Planet.svg';
import MaricLogo from '../Resources/MaricLogo.png';
import htmlSVG from '../LangSVGs/html.svg';
import cssSVG from '../LangSVGs/css.svg';
import jsSVG from '../LangSVGs/JavaScript.svg';
import nodeJsSVG from '../LangSVGs/nodeJs.svg';
import reactSVG from '../LangSVGs/react.svg';
import phpSVG from '../LangSVGs/php.svg';
import cppSVG from '../LangSVGs/cpp.svg';

import RightArrow from '../Resources/rightArrow.svg';
import LeftArrow from '../Resources/leftArrow.svg';

const AboutMe = () => {

	const listItemData = [
		{ id: 1, svgSrc: htmlSVG, text: 'HTML - Hyper Text Markup Language' },
		{ id: 2, svgSrc: cssSVG, text: 'CSS - Cascade Style Sheets' },
		{ id: 3, svgSrc: jsSVG, text: 'JavaScript' },
		{ id: 4, svgSrc: nodeJsSVG, text: 'nodeJs' },
		{ id: 5, svgSrc: reactSVG, text: 'React' },
		{ id: 6, svgSrc: phpSVG, text: 'PhP' },
		{ id: 7, svgSrc: cppSVG, text: 'C++' },
	  ];
	
	const backend = 'https://backend.vukmaric.rs/api/certificates/'

	const [value, setValue] = React.useState(null);
	const [certificateImages, setCertificateImages] = React.useState([]);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	
	useEffect(() =>{
		certChange('HTML');
	},[]);

	const certChange = (lang) =>{
		const selectedValue = lang;
		setValue(selectedValue);
		fetchCertificates(selectedValue);
	}
	
	const fetchCertificates = (language) =>
	{
		fetch(`${backend + 'get-certificates.php'}`, {
			method: 'POST',
			headers: {
			  	'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `language=${language}`,
		})
		.then((response) => response.json())
		.then((data) => {
		  	setCertificateImages(data);
			setSelectedIndex(0);
		})
		.catch((error) => {
		  	console.error('Error fetching certificates:', error);
		  	setCertificateImages([]);
		});
	};

	const switchImage = ( right ) => {
		let index = selectedIndex;
		if(right === true){
			if(index < certificateImages.length-1){
				index++;
			}
			else{
				index = 0;
			}
		}else{
			if(index > 0){
				index--;
			}
			else{
				index = certificateImages.length-1;
			}
		}
		setSelectedIndex(index);
	};

	return (
		<div className='AboutMe'>
			<div className='info'>
				<div className='avatarSec'>
					<img id='Avatar' src='https://avatars.githubusercontent.com/u/94225856?v=4' alt='avatar'/>
					<div className='techItemList'>
						<h3 style={{width: '100%', textAlign: 'center'}}>Technologies i use:</h3>
						{listItemData.map((item) => (
          					<ListItem key={item.id} svgSrc={item.svgSrc} text={item.text} />
        				))}
					</div>
					<img className='stats' src='https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=VukMar&theme=dark' alt='stats-github'></img>
				</div>
				<div className='mainInfo'>
					<div className='bio-sec'>
						<p>
							I'm a self-taught programmer from
						</p>
						<a id='CityLink' href='https://www.google.com/maps/place/%D0%9D%D0%BE%D0%B2%D0%B8+%D0%A1%D0%B0%D0%B4' target='_blank' rel="noreferrer">
							<img id='planet' src={PlanetSVG} alt='planet'/>
							Novi Sad, Serbia
						</a>
						<p>
							Born on September 25, 1994, I began my career as a skilled chef, delighting palates with my culinary creations.
						</p>
						<p>
							Driven by curiosity, I ventured into programming, discovering a new passion. Despite lacking formal education, I dedicated myself to self-learning, mastering various languages and technologies.
						</p>
						<p>
							I have learned from a variety of sources like YouTube and SoloLearn.
						</p>
						<p>
							Combining my background as a chef with programming, I embrace challenges, finding joy in creating innovative solutions. My diverse experiences enrich my problem-solving approach, driving me to make a positive impact.Through continuous learning and an entrepreneurial spirit, I strive for greatness, inspiring others to follow their passions. 
						</p>
					</div>
					<div className='certificates-sec'>
						<h1>CERTIFICATES</h1>
						<p className='pick-lang-title'>Pick a language</p>
						<div className='lang-buttons'>
							<button className={value === 'HTML' ? 'selected' : ''} onClick={()=>certChange('HTML')}>HTML</button>
							<button className={value === 'CSS' ? 'selected' : ''} onClick={()=>certChange('CSS')}>CSS</button>
							<button className={value === 'JavaScript' ? 'selected' : ''} onClick={()=>certChange('JavaScript')}>JavaScript</button>
							<button className={value === 'CPP' ? 'selected' : ''} onClick={()=>certChange('CPP')}>CPP</button>
						</div>
						<div className='certificates-display'>
							<button className={certificateImages.length <= 1? 'hidden' : 'left'} onClick={() => switchImage(false)}>
								<img src={LeftArrow} alt='arrow'></img>
							</button>
							{certificateImages.length > 0 ? (
								certificateImages.map((imageUrl, index) => (
										<img 
											className={selectedIndex === index? 'display-cert' : 'display-cert hidden'}
											key={index} 
											src={backend+imageUrl} 
											alt={`display-cert`} 
										/>
									))
								) : (
									<img 
											className='display-cert error' 
											src={MaricLogo} 
											alt={`display-cert`} 
									/>
								)
							}
							<button className={certificateImages.length <= 1? 'hidden' :'right'} onClick={() => switchImage(true)}>
								<img src={RightArrow} alt='arrow'></img>
							</button>
						</div>
						<div className='cert-list'>
							{certificateImages.length > 0 ? (
								certificateImages.map((imageUrl, index) => (
									<img className={selectedIndex === index ? 'selected' : '' } onClick={() => setSelectedIndex(index)} key={index} src={backend+imageUrl} alt={`${value} Certificate ${index + 1}`} />
									))
								) : (
										<p>No certificates found for {value}.</p>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutMe;
