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
					if(ArrayIncludesKeyword(sentenceToLowerArray(el.title), value) || ArrayIncludesKeyword(el.tags, value)){
						filtered.push(el);
					}
				})
			}
			else{
				console.log('No Value!');
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

	function sentenceToLowerArray(sentence) {
		// Convert the sentence to lowercase
		const lowerCaseSentence = sentence.toLowerCase();
		
		// Split the lowercase sentence into an array of words
		const wordsArray = lowerCaseSentence.split(/\s+/);
		
		return wordsArray;
	}

	function ArrayIncludesKeyword(arr, keyword) {
		return arr.some(el => wordsMatch(el, keyword));
	}

	function wordsMatch(KeywordSelected, word) {
		const keywordLowerCase = KeywordSelected.toLowerCase();
		const wordLowerCase = word.toLowerCase();
	
		return wordLowerCase.includes(keywordLowerCase);
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