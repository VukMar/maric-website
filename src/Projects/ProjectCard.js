import React from "react";

import Logo from "../Resources/MaricLogo.png";
import JavaScript from "../LangSVGs/JavaScript.svg"
import Html from "../LangSVGs/html.svg";
import CSS from "../LangSVGs/css.svg";
import ReactJS from "../LangSVGs/react.svg";
import CPP from "../LangSVGs/cpp.svg";
import PHP from "../LangSVGs/php.svg";
import NodeJS from "../LangSVGs/nodeJs.svg";

import GithubSvg from "../Resources/SocialSVGs/GitHub.svg";
import LinkSVG from "../Resources/EyeSVG.svg";

import "./ProjectCard.css";
import ListItem from "../AboutMe/ListItem";

function ProjectCard ({project, index}) {

    const iconReference = {
        js: JavaScript, 
        html: Html, 
        css: CSS, 
        cpp: CPP, 
        react: ReactJS, 
        php: PHP, 
        node: NodeJS
    };

    return(
        <div className="project-card" style={{animationDelay: `${0.25 * index}s`}}>
            <img className="project-cover" src={project.img !== null? project.img : Logo} alt="project-preview"/>
            <div className="project-info">
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
                <h3>Thenologies used:</h3>
                <div className="project-tech-list">
                {
                    project.tech.map((el,index) => (
                        <ListItem key={index} svgSrc={iconReference[el]} text={el}/>
                    ))
                }
                </div>
                {project.link !== null? (
                    <a href={project.link}>
                        <img width={20} src={LinkSVG} alt="gthub-icon"/>
                        {project.link}
                    </a>
                ) : (
                    <></>
                )}
                {project.githubLink !== null? (
                    <a href={project.githubLink}>
                        <img width={20} src={GithubSvg} alt="gthub-icon"/>
                        Github
                    </a>
                ) : (
                    <></>
                )}
            </div>
            <h2 className="hover-popup">HOVER ME!</h2>
        </div>
    )
}

export default ProjectCard;