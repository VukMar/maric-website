import React, { useState, useRef, useEffect } from 'react';
import './ListItem.css';

const ListItem = ({ svgSrc, text }) => {
	const [isHovering, setIsHovering] = useState(false);
	const tooltipRef = useRef(null);

	const handleMouseEnter = () => {
		setIsHovering(true);
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
	};

	useEffect(() => {
		const tooltip = tooltipRef.current;
		if(tooltip){
			if(isHovering){
				const tooltipHeight = tooltip.offsetHeight;
				tooltip.style.opacity = 1;
				tooltip.style.top = `-${tooltipHeight+10}px`;
				tooltip.style.height = `${tooltip.scrollHeight}px`;
			}else{
				tooltip.style.opacity = 0;
				tooltip.style.top = 0;
				tooltip.style.height = `0px`;
			}
		}
	},[isHovering])

	return (
		<div className='techItem'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<img src={svgSrc} alt="SVG" />

			<div ref={tooltipRef} className="tooltip">
				{text}
			</div>

		</div>
	);
};

export default ListItem;
