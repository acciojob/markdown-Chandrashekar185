
import React, { useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import "./styles.css";

export default function App() {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="app">
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
    </div>
  );
}
