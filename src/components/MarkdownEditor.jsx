import React, { useState, useEffect } from 'react';

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('<p class="loading">loading</p>');

  useEffect(() => {
    const parsedHtml = parseMarkdown(markdown);
    setHtml(parsedHtml);
  }, [markdown]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const parseMarkdown = (text) => {
    let lines = text.split('\n');

    const htmlLines = lines.map((line) => {
      // Headings
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;

      // Unordered list
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;

      // Bold: **text**
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Italic: *text*
      line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');

      // Wrap normal text in <p>
      return `<p>${line}</p>`;
    });

    // Convert <li> to inside <ul> block if needed
    const joined = htmlLines.join('\n');
    return wrapListItems(joined);
  };

  const wrapListItems = (html) => {
    // Match groups of <li> tags and wrap them in <ul>
    return html.replace(/(<li>.*?<\/li>)/gs, (match) => {
      return `<ul>${match}</ul>`;
    });
  };

  return (
    <>
      <textarea
        className="textarea"
        value={markdown}
        onChange={handleChange}
        placeholder="Write your markdown here..."
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </>
  );
}

export default MarkdownEditor;
