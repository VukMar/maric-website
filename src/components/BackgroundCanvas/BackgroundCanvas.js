import React, { useEffect, useRef, useState } from "react";
import "./BackgroundCanvas.css";

function BackgroundCanvas({page, items}) {

    const fps = 60;    
    const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
    const [stars, setStars] = useState([]);

    const wraperRef = useRef(null);

    class Star {
        constructor(x, y, radius, isIcon,icon) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.speed = isIcon? 0.3 : radius * 0.04;
            this.opacity = Math.random();
            this.color = `rgba(255,255,255,${this.opacity})`;
            this.riseOpacity = true;
            this.isIcon = isIcon;
            this.icon = icon;
        }

        draw(ctx) {
            if(this.isIcon){
                let img = new Image();
                img.src = this.icon;
                const aspectRatio = img.width / img.height;
                ctx.drawImage(img, this.x, this.y, 20, 20/aspectRatio);
            }else{
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }
        }

        animation(){
            this.y -= this.speed;
            if(this.y < 0) this.y = canvasSize.h;
            if(!this.isIcon){
                if(this.opacity > 1) this.riseOpacity = false;
                if(this.opacity < 0) this.riseOpacity = true;
                this.opacity += this.riseOpacity? 0.01 : -0.01;
                this.color = `rgba(255,255,255,${this.opacity})`;
            }
        }
    }

    useEffect(() => {
        if(page?.current){
            if(wraperRef?.current){
                wraperRef.current.style.height = page.current.offsetHeight/2;
            }
        }
        const calculateSize = () => {
        const canvas = document.querySelector('.background-canvas');
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        setCanvasSize({ w: width, h: height });
        }

        calculateSize();
        window.addEventListener('resize', calculateSize);

        return () => window.removeEventListener('resize', calculateSize);
    }, []);

    const generateStars = () => {
        let newStars = [];
        let numOfIcons = items.length - 1;
        if (canvasSize.w !== 0 && canvasSize.h !== 0) {
            for(let i = 0; i < 100; i++){
                const x = Math.round(Math.random() * (canvasSize.w));
                const y = Math.round(Math.random() * (canvasSize.h));
                const radius = Math.round(Math.random() * 5);
                if(numOfIcons >= 0){
                    const star = new Star(x, y, radius < 2? 2 : radius,true, items[numOfIcons].svgSrc);
                    newStars.push(star);
                }else{
                    const star = new Star(x, y, radius < 2? 2 : radius,false, null);
                    newStars.push(star);
                }
                numOfIcons -= 1;
            }
        }
        return newStars;
    }
    useEffect(() => {
            setStars(generateStars());
    },[canvasSize])

    useEffect(() => {
        const draw = () => {
            const canvas = document.querySelector('.background-canvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let newStars = stars;
            newStars.map(star => {
                star.animation();
                star.draw(ctx)}
            );
            setStars(newStars);
        };


        const interval = setInterval(draw, 1000/fps);
        return () => clearInterval(interval);
    }, [stars]);

    return (
        <div className="background-canvas-wraper" ref={wraperRef}>
            <canvas 
                width={canvasSize.w} 
                height={canvasSize.h}
                className="background-canvas"
            >
            </canvas>
        </div>
    );
}

export default BackgroundCanvas;
