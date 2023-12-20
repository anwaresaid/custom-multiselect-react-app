import React from "react";

const HighlightWord = ({ text, word }) => {
  const regex = new RegExp(`(${word})`, "gi"); // 'gi' for global and case-insensitive matching
  const parts = text?.split(regex);
  return (
    <div style={{ color: "rgb(22, 22, 53)" }}>
      {parts.map((part, index) =>
        part.toLowerCase() === word.toLowerCase() ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        )
      )}
    </div>
  );
};

function TextHighlighter({ text, word }) {
  return <HighlightWord text={text} word={word} />;
}

export default TextHighlighter;
