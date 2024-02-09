import React from "react";

import './BlogTopicCardMini.css';

import EyeSVG from '../../Resources/EyeSVG.svg';

const BlogTopicCardMini = ({topic,id}) => {

    const updateViews = async (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('id', topic.id)

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

        window.location.href = `/Blog/${topic.id}`;
        
    }

    return(
        <a href={`/Blog/${topic.id}`} key={id} onClick={updateViews} className="mini-blog-topic-card">
            <img src={topic.cover} alt="mini-topic-cover" />
            <h3 className="mini-card-topic-title">{topic.title}</h3>
            <h4 className="mini-card-topic-date">{topic.date}</h4>
            <p className="mini-card-topic-views">Read time: {topic.readTime}</p>
            <p className="mini-card-topic-views">
                Views: {topic.views ?? 0}
                <img style={{width: '20px'}} src={EyeSVG} alt="eye"/>
            </p>
        </a>
    )
}

export default BlogTopicCardMini;