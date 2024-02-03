import React, { useEffect } from "react";

import './CertDisplay.css';

import RightArrow from '../Resources/rightArrow.svg';
import LeftArrow from '../Resources/leftArrow.svg';
import MaricLogo from '../Resources/MaricLogo.png';

export const DisplayCert = ({certificateImages, pLanguage, backend}) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

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

    useEffect(()=>{
        setSelectedIndex(0);
    },[pLanguage])

    return(
        <>
        <div className='certificates-display'>
            <button 
            	className={certificateImages.length <= 1? 'hidden' : 'left'}
            	onClick={() => switchImage(false)}>
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
            <button 
            	className={certificateImages.length <= 1? 'hidden' :'right'} 
            	onClick={() => switchImage(true)}>
            	<img src={RightArrow} alt='arrow'></img>
            </button>
	    </div>
        <div className='cert-list'>
            {certificateImages.length > 0 ? (
                certificateImages.map((imageUrl, index) => (
                    <img className={selectedIndex === index ? 'selected' : '' } onClick={() => setSelectedIndex(index)} key={index} src={backend+imageUrl} alt={`${pLanguage} Certificate ${index + 1}`} />
                    ))
                ) : (
                        <p>No certificates found for {pLanguage}.</p>
                )
            }
        </div>
        </>
    )
}