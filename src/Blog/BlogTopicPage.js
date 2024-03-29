import React from "react";

import './BlogTopicPage.css'

import EyeSVG from '../Resources/EyeSVG.svg';

import MarkdownWithPrism from "./markdownReact";

function TopicPage( {topic} ){

    return (
        <div className="blog-topic-page">
            <div className="blog-topic-title">
                <img src={topic.cover} className="page-cover" alt="cover-page"></img>
                <div className="blog-topic-title-text">
                    <h1>{topic.title}</h1>
                    <h2>{topic.shortdesc}</h2>
                    <h3>Created: {topic.date}{topic.date[topic.date.length - 1] !== '.'? '.' : ''}</h3>
                    <h3 className="topic-page-views"><img style={{width: '20px'}} src={EyeSVG} alt="eye"/>Views: {topic.views}</h3>
                </div>
            </div>
            <div className="blog-contents">
                <MarkdownWithPrism markdownContent={topic.md} />
                <aside>
                    
                </aside>
            </div>
        </div>
    )

    
}
export default TopicPage;