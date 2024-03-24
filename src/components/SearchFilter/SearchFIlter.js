import React, { useState, useEffect } from "react";

import "./SearchFilter.css";

import {sortByDate,sortByViews} from '../../logic/sorting';

import { useFilterInitiated } from './FilterInitiatedProvider';

function SearchFilter ({content, setFilteredContent, SortOrder}) {

	const { setFilterInitiated } = useFilterInitiated();

	const [KeywordSelected, setSelectedKeyword] = useState('');
	const [FilterText, setFilterText] = useState('');
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
				setFilterInitiated(true);
				content.forEach(el => {
					if(ArrayIncludesKeyword(sentenceToLowerArray(el.title), value) || ArrayIncludesKeyword(el.tags, value)){
						filtered.push(el);
					}
				})
			}
			else{
				setFilterInitiated(false);
				filtered = content;
			}
		}else{
			setFilterInitiated(false);
			filtered = content;
		}
		console.log(filtered)
        if(SortOrder !== null){
            setFilteredContent(updateOrder(filtered));
        }else{
            setFilteredContent(filtered)
        }
		setFilterText(value);
	}

    function updateOrder(List){
		switch(SortOrder){
			case 'date-from-oldest':
				return sortByDate(List);
				break;
			case 'date-from-latest':
				return sortByDate(List);
				break;
			case 'views-from-lowest':
				return sortByViews(List);
				break;
			case 'views-from-highest':
				return sortByViews(List);
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
		return arr.some(el => wordsMatch(keyword, el));
	}

	function wordsMatch(KeywordSelected, word) {
		if(KeywordSelected.length < 3){
			return false;
		}
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