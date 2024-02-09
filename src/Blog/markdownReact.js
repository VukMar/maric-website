import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-clike'; // Import Prism clike component
import 'prismjs/themes/prism-twilight.css';

function MarkdownComponent({ markdownContent }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className='blog-topic-section'>
      <ReactMarkdown
        children={markdownContent}
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';
            const language = lang === 'cpp' || lang === 'c' ? 'clike' : lang; // Treat cpp and c as clike
            return !inline ? (
              <PrismSyntaxHighlighter
                language={language}
                children={String(children).replace(/\n$/, '')}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
}

const PrismSyntaxHighlighter = ({ language, children }) => {
  const html = Prism.highlight(children, Prism.languages[language], language);
  const className = `language-${language}`;
  return <code className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownComponent;
