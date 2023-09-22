import React from "react";

import './BlogTopicPage.css'

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
            {topic.largedesc.map((sec,index) => (
                <div key={`blog-sec${index}`} className="blog-topic-section">
                    <h2>{sec.title}</h2>
                    {sec.paragraphs.map((paragraph, index) =>(
                        paragraph.type === 'text'? (
                            <p key={`paragraph${index}`}>{paragraph.content}</p>
                        ) : paragraph.type === 'code'? (
                            <pre className="code" key={`paragraph${index}`}>{paragraph.content}</pre>
                        ) : paragraph.type === 'ul'? (
                            <ul key={`paragraph${index}`}>
                                {paragraph.content.map((li, index) => (
                                    <li key={`list-item${index}`}>
                                        {li.type === 'text'? (li.content) 
                                        : li.type === 'code'? (
                                            <pre className="code">{li.content}</pre>
                                        ) : null}</li>
                                ))}
                            </ul>
                        ) : paragraph.type === 'ol'? (
                            <ol key={`paragraph${index}`}>
                                {paragraph.content.map((li, index) => (
                                    <li key={`list-item${index}`}>
                                        {li.type === 'text'? (li.content) 
                                        : li.type === 'code'? (
                                            <pre className="code">{li.content}</pre>
                                        ) : null}</li>
                                ))}
                            </ol>
                        ) : null)
                    )}
                    
                </div>
            ))}
        </div>
    )

    
}
export default TopicPage;