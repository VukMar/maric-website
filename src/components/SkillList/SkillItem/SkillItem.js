import React, { useState } from "react";

import "./SkillItem.css"

function SkillItem({item, setSelectedItem, selectedItem}){

    const handleSelection = (info) =>{
        setSelectedItem(info);
    }

    return (
        <p 
            className='skill-item' 
            style={{top: `${item.pos.top}px`, left: `${item.pos.left !== 0? item.pos.left + 'px' : ''}`}}
            onMouseEnter={() => handleSelection(item)} 
            onMouseLeave={() => handleSelection(null)}
        >
            
            <img style={{width: selectedItem !== null && selectedItem.id === item.id? '0px': '98%'}} src={item.svgSrc} alt="item-icon"/>
        
        </p>
    )

}

export default SkillItem;