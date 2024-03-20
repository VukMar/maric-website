import React, { useState, useEffect } from "react";

import "./SearchFilter.css";

import {sortByDate,sortByViews} from '../../logic/sorting';

function SearchFilter ({content, setFilteredContent, SortOrder}) {

	const [KeywordSelected, setSelectedKeyword] = useState('');
	const [FilterText, setFIlterText] = useState('');
	const [Keywords, setKeywords] = useState([]);

	useEffect(() => {
		if(content.length > 0){
			generateKeyWords();
		}
	}, [content]);

	const generateKeyWords = () => {
		let keywordsSet = new Set();
	  
		content.forEach(el => {
            if(el.tags !== null && el.tags !== undefined){
                const tagsArray = Array.isArray(el.tags) ? el.tags : Object.values(el.tags);
                
                tagsArray.forEach(tag => {
                    keywordsSet.add(tag);
                });
            }
		});
	  
		const keywords = Array.from(keywordsSet);
		setKeywords(keywords);
	}

    const handleFilter = (value) => {
        let filtered = [];
		if(value !== null && value !== undefined){
            setSelectedKeyword(value);
			if(value && value.length >= 3){
				content.forEach(el => {
					if(AincludesB(el.title, value) || tagsMatch(el.tags, value)){
						filtered.push(el);
					}
				})
			}
			else{
				filtered = content;
			}
		}else{
			filtered = content;
		}
        if(SortOrder !== null){
            setFilteredContent(updateTopicOrder(filtered));
        }else{
            setFilteredContent(filtered)
        }
		setFIlterText(value);
	}

    function updateTopicOrder(content){
		switch(SortOrder){
			case 'date-from-oldest':
				return sortByDate(content);
				break;
			case 'date-from-latest':
				return sortByDate(content);
				break;
			case 'views-from-lowest':
				return sortByViews(content);
				break;
			case 'views-from-highest':
				return sortByViews(content);
				break;
		}
	}

    const tagsMatch = (tags, keyword) => {
        if(tags !== null && tags !== undefined){
            const tagsArray = Array.isArray(tags) ? tags : Object.values(tags);
            tagsArray.forEach(tag => {
                return wordsMatch(tag, keyword);
            });
        }
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

    return(

        <div className="search-bar-container">
            <input className="search-bar" type="text" placeholder="Filter" onChange={e => handleFilter(e.target.value)} value={FilterText}/>
            <div className="keyword-container">
                {Keywords? (
                    Keywords.map((word, index) => (
                        <button className={wordsMatch(KeywordSelected, word)? 'selected' : ''} key={`keyword${index}`} onClick={() => handleFilter(word)}>{word}</button>
                        ))
                    ) : (
                        <></>
                    )}
            </div>
        </div>
    )
}

export default SearchFilter;