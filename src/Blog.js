import React from "react";
import BlogTopic from "./BlogTopic";
import './Blog.css'

const Blog = ({topicList}) => {
    return (
      	<div className="blog">
			<h1>Welcome to my blog! Pick a Topic!</h1>
			<div className="blog-topics">
				{topicList.length > 0 ? (
						topicList.map((topic, index) => (
							<BlogTopic cover={topic.coverURL} title={topic.title} date={topic.date} smallDesc={topic.smallDesc}/>
							))
						) : (
								<p>Comming Soon</p>
						)
					}
			</div>
      	</div>
    );
  };
  
export default Blog;