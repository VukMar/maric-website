import React from 'react';
import { BrowserRouter as  Link } from 'react-router-dom';

import './BlogTopic.css'

const BlogTopic = ({title, smallDesc, cover, date, id}) => {
    return (
      	<a id={`topic${id}`} className="blog-topic" href={`/Blog/${title}`}>
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