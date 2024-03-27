import React , {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";

import './NavBar.css';

import HomeSVG from '../../Resources/Home.svg';
import AboutMeSVG from '../../Resources/AboutMe.svg';
import MyProjectsSVG from '../../Resources/Blog.svg';
import BurgerButton from "../BurgerButton/BurgerButton";

import Logo from '../../Resources/MaricLogo.png'

const NavBar = () =>{

    const [selectedLink, setSelectedLink] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        
        setSelectedLink(window.location.pathname);
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => setSelectedLink(window.location.pathname), []);

    useEffect(() => {
        if (windowWidth < 1000) {
            setExpanded(false);
        }else{
            setExpanded(true);
        }
    }, [windowWidth]);

    const handleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleClicks = (e,link) => {
        if (windowWidth < 1000) handleExpanded();
        if(link !== "/ContactMe"){
            setSelectedLink(link);
        }

    };

    useEffect(() => {
        if(navRef !== null){
            if(navRef.current !== null || navRef.current !== undefined){
                navRef.current.style.width = expanded? `90%` : '0px';
                navRef.current.style.opacity = expanded? 1 : 0;

            }
        }
    },[expanded])

    return(
        <div className="nav-container">
        <img className='MainLogo' src={Logo} alt='main-logo'/>
        <BurgerButton widnowWidth={windowWidth} handleExpanded={handleExpanded} expanded={expanded}/>
        <nav ref={navRef} id="nav">
            <div className="link-list">
                <BurgerButton widnowWidth={windowWidth} handleExpanded={handleExpanded} expanded={expanded}/>
				<Link className={selectedLink === '/' ? 'selected' : ''} onClick={(e) => handleClicks(e,'/')} to="/">
					<img className={selectedLink === '/' ? 'selected' : ''} src={HomeSVG} alt="nav-icon"/>
					Home
				</Link>
                <Link className={selectedLink === '/AboutMe' ? 'selected' : ''} onClick={(e) => handleClicks(e,'/AboutMe')} to="/AboutMe">
					<img className={selectedLink === '/AboutMe' ? 'selected' : ''} src={AboutMeSVG} alt="nav-icon"/>
					About Me
				</Link>
				<Link className={selectedLink === '/Blog' ? 'selected' : ''} onClick={(e) => handleClicks(e,'/Blog')} to="/Blog">
					<img className={selectedLink === '/Blog' ? 'selected' : ''} src={MyProjectsSVG} alt="nav-icon"/>
					Blog
				</Link>
                <Link className={selectedLink === '/Projects' ? 'selected' : ''} onClick={(e) => handleClicks(e,'/Projects')} to="/Projects">
					<img className={selectedLink === '/Projects' ? 'selected' : ''} src={MyProjectsSVG} alt="nav-icon"/>
					Projects
				</Link>
            </div>
		</nav>
        </div>
    )
}

export default NavBar;