import React from "react";

import './BlogTopicCard.css';

import EyeSVG from '../../Resources/EyeSVG.svg';

const BlogTopicCard = ({topic,id}) => {

    const updateViews = async (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('title', topic.title)

        const response = await fetch('https://backend.vukmaric.rs/api/blog/updateViews.php', {
            method: 'POST', 
            body: data
        });
        const responseData = await response.json();
        if(responseData.success){
            console.log(responseData);
        }else{
            console.error(responseData.error)
        }

        window.location.href = `/blog/${topic.title}`;
        
    }

    return(
        <a key={id} onClick={updateViews} className="blog-topic-card">
            <img src={topic.cover} alt="topic-cover" />
            <h2 className="card-topic-title">{topic.title}</h2>
            <h4 className="card-topic-views">Read time: {topic.readTime}</h4>
            <h4 className="card-topic-views">
                Views: {topic.views ?? 0}
                <img style={{width: '20px'}} src={EyeSVG} alt="eye"/>
            </h4>
            <h3 className="card-topic-date">{topic.date}</h3>
            <p className="card-topic-info">{topic.shortdesc}</p>
        </a>
    )
}

export default BlogTopicCard;