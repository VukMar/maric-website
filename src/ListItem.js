import React, { useState, useRef } from 'react';
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

  const handleMouseMove = (event) => {
    const tooltip = tooltipRef.current;
    if (tooltip && isHovering) {
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${event.clientY - tooltipHeight}px`;
    }
  };

  return (
    <div className='techItem'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img src={svgSrc} alt="SVG" />
      {isHovering && (
        <p ref={tooltipRef} className="tooltip">
          {text}
        </p>
      )}
    </div>
  );
};

export default ListItem;
