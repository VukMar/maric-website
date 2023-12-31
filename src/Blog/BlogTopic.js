import React from 'react';

import './BlogTopic.css'

const BlogTopic = ({title, smallDesc, cover, date, id}) => {
    return (
      	<a id={`topic${id}`} className="blog-topic" href={date === 'Coming soon'? '' : `/Blog/${title}`}>
            <img className="cover" src={cover} alt='cover'/>
            <div className='text-container'>
              <p className="title">{title}</p>
              <p className="date">{date}</p>
              <p className="small-desc">{smallDesc}</p>
            </div>
      	</a>
    );
  };
  
export default BlogTopic;