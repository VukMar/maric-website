import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-php-extras';
import 'prismjs/components/prism-bash';
import 'prism-theme-night-owl/build/style.css';
import CopySVG from '../Resources/copySVG.svg';
import SuccessSVG from '../Resources/Success.svg';
import FailSVG from '../Resources/False.svg';
import TableOfContents from './TableOfContents';

function MarkdownComponent({ markdownContent }) {
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    const headings = markdownContent.match(/#{1,6} .+/g);
    if (headings) {
      const toc = headings.map((heading) => {
        const level = heading.match(/^#+/)[0].length;
        const text = heading.replace(/^#{1,6} /, '');
        const id = text.replace(/\s+/g, '-').toLowerCase();
        return { level, text, id };
      });
      setTableOfContents(toc);
    }
  }, [markdownContent]);

  const renderers = {
    heading: ({ level, children }) => {
      const id = children[0].props.value.replace(/\s+/g, '-').toLowerCase();
      return React.createElement('h' + level, { id }, children);
    },
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const lang = match ? match[1] : '';
      const language = lang === 'cpp' || lang === 'c' || lang === 'cmake' || lang === '' ? 'clike' : lang;
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
  };

  return (
    <div className='blog-topic-section'>
      <TableOfContents tableOfContents={tableOfContents} />
      <ReactMarkdown
        children={markdownContent}
        components={renderers}
      />
    </div>
  );
}

const CopyButton = ({ markdownContent }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent)
      .then(() => {
        setCopySuccess(true);
        setCopyError(false);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setCopyError(true);
        setCopySuccess(false);
        setTimeout(() => setCopyError(false), 2000);
      });
  };

  return (
    <button className="copy-button" onClick={handleCopy}>
      <img width={30} src={copySuccess ? SuccessSVG : copyError ? FailSVG : CopySVG} alt='copy' />
      {copySuccess ? 'Copied!' : copyError ? "Fail to Copy!" : "Copy"}
    </button>
  );
};

const PrismSyntaxHighlighter = ({ language, children }) => {
  const html = Prism.highlight(children, Prism.languages[language], language);
  const className = `language-${language}`;

  return (
    <>
      <div className='code-header'>
        <h3>{language}</h3>
        <CopyButton markdownContent={children} />
      </div>
      <pre className={`inner-pre ${className}`}><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
    </>
  );
};

export default MarkdownComponent;
