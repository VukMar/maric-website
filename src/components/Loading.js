import React, { useEffect, useRef, useState } from "react";

import './Loading.css';

import IconSVG from '../Resources/MaricIcon.png';


function LoadingScreen({isLoading , Text , setIsLoading, isNotification}){

    const [DotsContent, setDotsContent] = useState('.');

    const dots = () => {
        setDotsContent((prevContent) => {
            if (prevContent.length > 3) {
              return '.';
            } else {
              return prevContent + '.';
            }
          });
    };

    useEffect(() => {
        window.scrollTo(0,0);
        
        isNotification = !isNotification === undefined;
        
        const interval = setInterval(dots, 1000);
        return () => {
        clearInterval(interval);
        };
    }, []);
    
    useEffect(() => {
        document.body.style.overflow = isLoading? 'hidden' : 'auto';
    }, [isLoading])
    
    return(
        <div className={isLoading? "loading-screen" : "loading-screen hidden"}>
            <img className={isNotification? "no-rotate" : ""} src={IconSVG} alt="logo" />
            <h2>{Text}{isNotification? '' : DotsContent}</h2>
            <button className={isNotification? "loading-exit-button" : "loading-exit-button hidden"} onClick={setIsLoading}>OK</button>
        </div>
    )
}

export default LoadingScreen;