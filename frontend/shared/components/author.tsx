'use client'

import React, { useState, useRef, useEffect } from 'react';

interface AuthorProps {
    editorMode: boolean;
    value: string;
}

export default function Author({ editorMode, value }: AuthorProps) {
  const defaultText = "Author";
  const [author, setAuthor] = useState(value || defaultText);
  const [cssClass, setCssClass] = useState(value ? "dark-grey" : "light-grey");
  const authorRef = useRef<HTMLSpanElement>(null);

  const handleFocus = () => {
    if (!editorMode) return;
    console.log("handling author")
    setCssClass("dark-grey");
    if (authorRef.current && authorRef.current.textContent === defaultText) {
        authorRef.current.textContent = ''; // Clear the default text
        authorRef.current.focus();
    }
  };

  useEffect(() => {
      const handleKeyDown = (event: { key: string; preventDefault: () => void; }) => {
          if (event.key === 'Enter') {
              event.preventDefault(); // Prevents the Enter key from creating a new line
          }
      };

      // Add the event listener if the current ref is not null
      authorRef.current?.addEventListener('keydown', handleKeyDown);
      authorRef.current?.addEventListener('focus', handleFocus);

      // Return a cleanup function
      return () => {
          // Remove the event listener if the current ref is not null
          authorRef.current?.removeEventListener('keydown', handleKeyDown);
          authorRef.current?.removeEventListener('focus', handleFocus);
      };
  }, []);

  const handleBlur = () => {
      if (authorRef.current) {
        let text = authorRef.current.textContent || "";
        text = text.replace(/[\n\t]|[^a-zA-Z0-9 ]/g, "");
        if (text === "") { // Check explicitly for empty string
            setCssClass("light-grey");
            authorRef.current.textContent = defaultText; // Reset to default if empty
        }
        else {
            setCssClass("dark-grey");
        }

        setAuthor(text || defaultText);
      }
      else {
        setAuthor(defaultText);
      }
  };

  return (
      <div style={{
        display:'flex', 
        flexDirection:'row',
        fontFamily: 'Kadwa', 
        fontWeight: 400, 
        fontStyle: 'normal'
      }}>
        <div>By&nbsp;</div>
          <span
              id='author'
              ref={authorRef}
              contentEditable={editorMode}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={cssClass}
              style={{ 
                  outline: 'none', 
                  cursor: 'text', 
                  minWidth: '100px', 
                  display: 'inline-block',
                  fontFamily: 'Kadwa', 
                  fontWeight: 400, 
                  fontStyle: 'normal'
              }}
              suppressContentEditableWarning={true}
          >
              {author}
          </span>
      </div>
  );
}
