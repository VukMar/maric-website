import React from "react";
import { useState, useEffect } from "react";
import BlogTopicCard from "../components/BlogTopicCard/BlogTopicCard";
import './Blog.css'
import SearchFilter from "../components/SearchFilter/SearchFIlter";

import { useFilterInitiated } from '../components/SearchFilter/FilterInitiatedProvider';


const Blog = ({topicList}) => {

	const {filterInitiated }= useFilterInitiated();

	const [FilteredTopics, setFilteredTopics] = useState([]);
	const [SortOrder,setSortOrder] = useState('date-from-latest');

	const renderBlogTopicCards = (topics) => {
		console.log(topics);
        return topics.map((topic, index) => (
            <BlogTopicCard key={index} topic={topic} id={index}/>
        ));
    };
	
    return (
      	<div className="blog">
			<h1>Blog</h1>
			<SearchFilter content={topicList} setFilteredContent={setFilteredTopics} SortOrder={SortOrder} />
			<div className="blog-topics">
			{filterInitiated && FilteredTopics.length === 0? (
                    <p>Sorry, it appears that the search found no results! :(</p>
            ):
                renderBlogTopicCards(
                    FilteredTopics.length !== 0 ? FilteredTopics : topicList
            )}
			</div>
      	</div>
    );
  };
  
export default Blog;