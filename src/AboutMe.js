// src/HelloPageOne.js
import React from 'react';
import { useEffect } from 'react';

import './AboutMe.css';

import ListItem from './ListItem';

import PlanetSVG from './Planet.svg';
import Avatar from './Resources/Avatar.jpg';
import MaricLogo from './Resources/MaricLogo.png';
import htmlSVG from './LangSVGs/html.svg';
import cssSVG from './LangSVGs/css.svg';
import jsSVG from './LangSVGs/JavaScript.svg';
import nodeJsSVG from './LangSVGs/nodeJs.svg';
import reactSVG from './LangSVGs/react.svg';
import phpSVG from './LangSVGs/php.svg';
import cppSVG from './LangSVGs/cpp.svg';

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


	const [value, setValue] = React.useState(null);
	const [certificateImages, setCertificateImages] = React.useState([]);
	const [SelectedImage, setSelectedImage] = React.useState(null);
	
	useEffect(() =>{
		certChange('HTML');
	},[]);

	const selectImage = (img) =>{
		setSelectedImage(img);
	}

	const certChange = (lang) =>{
		const selectedValue = lang;
		setValue(selectedValue);
		fetchCertificates(selectedValue);
		setSelectedImage(null);
	}
	
	const fetchCertificates = (language) =>
	{
		fetch('http://backend.vukmaric.rs/get-certificates.php', {
			method: 'POST',
			headers: {
			  	'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `language=${language}`,
		})
		.then((response) => response.json())
		.then((data) => {
		  	setCertificateImages(data);
		})
		.catch((error) => {
		  	console.error('Error fetching certificates:', error);
		  	setCertificateImages([]);
		});
	};



	return (
		<div className='AboutMe'>
			<div className='info'>
				<div className='avatarSec'>
					<img id='Avatar' src={Avatar} alt='avatar'/>
					<p className='TechStackTitle'>Technologies i use:</p>
					<div className='techItemList'>
						{listItemData.map((item) => (
          					<ListItem key={item.id} svgSrc={item.svgSrc} text={item.text} />
        				))}
					</div>
				</div>
				<div className='mainInfo'>
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
				<img className={SelectedImage === null ? 'display-cert error' : 'display-cert'} src={SelectedImage === null ? MaricLogo : SelectedImage} alt='diplay certificate'></img>
				<div className='cert-list'>
					{certificateImages.length > 0 ? (
						certificateImages.map((imageUrl, index) => (
							<img className={SelectedImage === 'http://backend.vukmaric.rs/' + imageUrl ? 'selected' : '' } onClick={() => selectImage('http://backend.vukmaric.rs/' + imageUrl)} key={index} src={'http://backend.vukmaric.rs/'+imageUrl} alt={`${value} Certificate ${index + 1}`} />
							))
							) : (
								<p>No certificates found for {value}.</p>
							)
						}
				</div>
			</div>
		</div>
	);
};

export default AboutMe;
