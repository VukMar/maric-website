import React from "react";
import { useState, useEffect } from "react";
import BlogTopic from "./BlogTopic";
import './Blog.css'


const Blog = ({topicList}) => {

	const [Keywords, setKeywords] = useState([]);
	const [KeywordSelected, setSelectedKeyword] = useState('');
	const [FilteredTopics, setFilteredTopics] = useState([]);
	const [FilterText, setFIlterText] = useState('');

	useEffect(() => {
		if(topicList.length > 0){
			generateKeyWords();
			setFilteredTopics(topicList);
		}
	}, [topicList]);

	const generateKeyWords = () => {

		let keywords = [];
	
		topicList.map(el => {
			el.title.split(" ").map(keyword =>{
				if(keyword.length >= 3 && !keywords.includes(keyword))
					keywords.push(keyword);
			});
		})
		setKeywords(keywords);
	}

	const selectKeyword = (value) => {

	}

	const handleFilter = (value) => {
		setSelectedKeyword(value);
		if(value.length >= 3){
			let topics = [];
			topicList.map(topic => {
				if(AincludesB(topic.title, value)){
					topics.push(topic);
				}
			})
			setFilteredTopics(topics);
		}
		else{
			setFilteredTopics(topicList);
		}
		setFIlterText(value);
	}

	const wordsMatch = (a, b) => {
		const cleanA = a.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
		const cleanB = b.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
		return cleanA === cleanB;
	}
	function AincludesB(a, b) {
		// Remove spaces, punctuation, and symbols from both strings and convert them to lowercase
		const cleanA = a.replace(/[.,\/#!$%\^&\*;:{}=\-_`~() ]/g, '').toLowerCase();
		const cleanB = b.replace(/[.,\/#!$%\^&\*;:{}=\-_`~() ]/g, '').toLowerCase();
	  
		// Check if cleanB includes cleanA
		return cleanA.includes(cleanB);
	}

    return (
      	<div className="blog">
			<h1>Blog</h1>
			<div className="search-bar-section">
				<input className="search-bar" type="text" placeholder="Filter" onChange={e => handleFilter(e.target.value)} value={FilterText}/>
				<div className="keyword-container">
					{Keywords.length > 0? (
						Keywords.map((word, index) => (
							<button className={wordsMatch(KeywordSelected, word)? 'selected' : ''} key={`keyword${index}`} onClick={() => handleFilter(word)}>{word}</button>
						))
					) : (
						<p>Nothing found!</p>
					)}
				</div>
			</div>
			<div className="blog-topics">
				{FilteredTopics.length > 0 ? (
						FilteredTopics.map((topic, index) => (
							<BlogTopic key={index} id={index} cover={topic.cover} title={topic.title} date={topic.date} smallDesc={topic.shortdesc}/>
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