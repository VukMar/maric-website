import React from "react";

import './BlogTopicCard.css';

const BlogTopicCard = ({topic}) => {
    return(
        <div className="blog-topic-card">
            <img src={topic.cover} alt="topic-cover" />
            <h2 className="topic-title">{topic.title}</h2>
            <h3 className="topic-date">{topic.date}</h3>
            <p className="topic-info">{topic.shortdesc}</p>
            <h4 className="topic-views">{topic.views}</h4>
        </div>
    )
}

export default BlogTopicCard;