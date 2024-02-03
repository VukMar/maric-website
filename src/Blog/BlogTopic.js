import React from 'react';

import './BlogTopic.css'

const BlogTopic = ({topic,id}) => {
    return (
      	<a key={`topic${id}`} className="blog-topic" href={topic.date === 'Coming soon'? '' : `/Blog/${topic.title}`}>
            <img className="cover" src={topic.cover} alt='cover'/>
            <div className='text-container'>
              <p className="title">{topic.title}</p>
              <p className="date">{topic.date}</p>
              <p className="small-desc">{topic.shortdesc}</p>
            </div>
      	</a>
    );
  };
  
export default BlogTopic;