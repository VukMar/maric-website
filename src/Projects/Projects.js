import React, { useEffect, useState } from "react";

import './Projects.css';
import LoadingCard from "../components/loading-card/LoadingCard";
import ProjectCard from "./ProjectCard";
import SearchFilter from "../components/SearchFilter/SearchFIlter";

import { useFilterInitiated } from '../components/SearchFilter/FilterInitiatedProvider';

const Projects = () => {

    const {filterInitiated} = useFilterInitiated();

    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        getProjects();
    },[])

    const getProjects = async () => {
        try {
            const response = await fetch("https://vukmaric.com/backend/api/projects/getProjects.php");
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setProjects(data);

        } catch (error) {
            console.error('There was a problem getting project list:', error);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return(
        <div className="projects-page">
            <h1>Projects</h1>
            <h3>Explore a collection of projects crafted by me, showcasing the diverse technologies employed in their development.</h3>
            <SearchFilter content={projects} setFilteredContent={setFilteredProjects} SortOrder={null}/>
            <div className="projects-container">
                {loading? (
                    <>
                    <LoadingCard key={1}/>
                    <LoadingCard key={2}/>
                    <LoadingCard key={3}/>
                    <LoadingCard key={4}/>
                    </>
                ) : filteredProjects.length !== 0? (
                    filteredProjects.map((el,index) => (
                        <ProjectCard key={index} project={el} index={index} />
                    ))
                ) : filterInitiated? (
					<p>Sorry it appears that the search found no results! :(</p>
				): projects.length !== 0? (
                    projects.map((el,index) => (
                        <ProjectCard key={index} project={el} index={index} />
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Projects;