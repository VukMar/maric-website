import React from 'react';

import './TableOfContents.css';

function TableOfContents({ tableOfContents }) {
  return (
    <div className="table-of-contents">
      <h2>Table of Contents</h2>
      <ul>
        {tableOfContents.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TableOfContents;
