import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './BlogTopic.css'

const BlogTopic = ({title, smallDesc, cover, date}) => {
    return (
      	<Link className="blog-topic" to={`/Blog/${title}`}>
            <img className="cover"/>
            <p className="title"></p>
            <p className="date"></p>
            <p className="small-desc"></p>
      	</Link>
    );
  };
  
export default BlogTopic;