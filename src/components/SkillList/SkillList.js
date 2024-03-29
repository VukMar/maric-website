import React, { useEffect, useState } from "react";

import "./SkillList.css";
import SkillItem from "./SkillItem/SkillItem";

function SkillList({items, text}){

    const [angle, setAngle] = useState(0);
    const [newItems, setNewItems] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isAnimationRunning, setIsAnimationRunning] = useState(true);
    const [timePassed, setTimePassed] = useState(0);

    const calculatePos = (currentAngle) => {
        const len = items.length;
        let re = [];

        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const centerX = 125;
        const centerY = 125;
    
        const radius = 110;
    
        const angleIncrement = (2 * Math.PI) / len;

        // Initialize a random seed based on the current time
        const seed = Date.now();
        let random = seed % len;

        // Use the random seed to generate a random number
        const randomEl = random;
        
        items.forEach((el, index) => {
            const angle = currentAngle + index * angleIncrement;
            
            const x = centerX + Math.cos(angle) * radius - 15;
            const y = centerY + Math.sin(angle) * radius - 15;
            el.pos = { top: y, left: x };
            re.push(el);
        });
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        if(timePassed > 1000){
            setSelectedItem(re[randomEl]);
            setTimePassed(0);
        }
        drawConnetion();
        ctx.strokeStyle = 'white';
        ctx.stroke();

        setNewItems(re);
    };

    const orbit = () => {
        const interval = setInterval(() => {
            setAngle(prevAngle => prevAngle + 0.002);
            setTimePassed(prevTime => prevTime + 10);
        }, 10);
      
        return () => clearInterval(interval);
    };
      
    useEffect(() => {
        if (isAnimationRunning) {
            const stopAnimation = orbit();
            return stopAnimation;
        } else {
            // Store the final angle when the animation stops
            setAngle(prevAngle => prevAngle % (2 * Math.PI));
        }
    }, [isAnimationRunning]);

    useEffect(() => {
        calculatePos(angle);
    }, [angle]);

    function handleAnimation(state){
        setIsAnimationRunning(state);
        setSelectedItem(null);
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    useEffect(()=>{
        drawConnetion()
    },[selectedItem])   

    const drawConnetion = () => {
        const canvas = document.querySelector('.canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(selectedItem){
            let centerX = 125;
            let centerY = 125;
            let x = selectedItem.pos.left;
            let y = selectedItem.pos.top;

            //Draw Line
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x + 15, y + 15);
            ctx.strokeStyle = 'white';
            ctx.stroke();
            
            //Draw Circle
            ctx.beginPath();
            ctx.arc(x + 15, y + 15, 15, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }

    return (
        <div className="skill-list-wraper">
            <div className="skill-list" onMouseEnter={() => handleAnimation(false)} onMouseLeave={() => handleAnimation(true)}>
                <canvas className="canvas" width={250} height={250}></canvas>
                {newItems !== null &&  newItems !== undefined? (
                    newItems.map((el) => (
                            <SkillItem selectedItem={selectedItem} setSelectedItem={setSelectedItem} key={el.id} item={el} />
                    ))
                ) : (
                    <></>
                )}
                    <p className="middle-text">{selectedItem !== null? selectedItem.text : text}</p>
            </div>
        </div>
    )
}

export default SkillList;