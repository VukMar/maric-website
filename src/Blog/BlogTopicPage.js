import React from "react";


import './BlogTopicPage.css'
import MarkdownWithPrism from "./markdownReact";

function TopicPage( {topic} ){

    return (
        <div className="blog-topic-page">
            <div className="blog-topic-title">
                <img src={topic.cover} className="page-cover" alt="cover-page"></img>
                <div className="blog-topic-title-text">
                    <h1>{topic.title}</h1>
                    <h2>{topic.shortdesc}</h2>
                    <h3>{topic.date}</h3>
                </div>
            </div>
            <MarkdownWithPrism markdownContent={topic.md} />
            
        </div>
    )

    
}
export default TopicPage;