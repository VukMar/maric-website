import React from "react";
import { useState, useEffect } from "react";
import BlogTopicCard from "../components/BlogTopicCard/BlogTopicCard";
import './Blog.css'
import SearchFilter from "../components/SearchFilter/SearchFIlter";


const Blog = ({topicList}) => {

	const [FilteredTopics, setFilteredTopics] = useState([]);
	const [SortOrder,setSortOrder] = useState('date-from-latest');

    return (
      	<div className="blog">
			<h1>Blog</h1>
			<SearchFilter content={topicList} setFilteredContent={setFilteredTopics} SortOrder={SortOrder} />
			<div className="blog-topics">
				{FilteredTopics && FilteredTopics.length > 0 ? (
						FilteredTopics.map((topic, index) => (
							<BlogTopicCard topic={topic} id={index}/>
							))
						) : topicList && topicList.length > 0 ? (
							topicList.map((topic, index) => (
								<BlogTopicCard topic={topic} id={index}/>
								))
							) : (
								<p>Sorry no topics found, more to come!</p>
						)
					}
			</div>
      	</div>
    );
  };
  
export default Blog;