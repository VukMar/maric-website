import React from "react";
import { useState, useEffect } from "react";
import BlogTopicCard from "../components/BlogTopicCard/BlogTopicCard";
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
		let keywordsSet = new Set();
	  
		topicList.forEach(el => {
			const tagsArray = Array.isArray(el.tags) ? el.tags : Object.values(el.tags);
		
			tagsArray.forEach(tag => {
				keywordsSet.add(tag);
			});
		});
	  
		const keywords = Array.from(keywordsSet);
		setKeywords(keywords);
	}

	const handleFilter = (value) => {
		setSelectedKeyword(value);
		if(value.length >= 3){
			let topics = [];
			topicList.map(topic => {
				if(AincludesB(topic.title, value) || tagsMatch(topic.tags, value)){
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

	const tagsMatch = (tags, keyword) => {
		const tagsArray = Array.isArray(tags) ? tags : Object.values(tags);
		tagsArray.forEach(tag => {
			return wordsMatch(tag, keyword);
		});
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