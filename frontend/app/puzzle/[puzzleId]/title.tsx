'use client'

import React, { useState, useRef, useEffect } from 'react';

interface TitleProps {
    editorMode: boolean;
    value: string;
}

export default function Title({ editorMode, value }: TitleProps) {
  const defaultText = "Title";
  const [title, setTitle] = useState(value || defaultText);
  const [cssClass, setCssClass] = useState(value ? "dark-grey" : "light-grey");
  const titleRef = useRef<HTMLSpanElement>(null);

  const handleFocus = () => {
    if (!editorMode) return;
    console.log("handling title")
    setCssClass("dark-grey");
    if (titleRef.current && titleRef.current.textContent === defaultText) {
        titleRef.current.textContent = ''; // Clear the default text
        titleRef.current.focus();
    }
  };

  useEffect(() => {
      const handleKeyDown = (event: { key: string; preventDefault: () => void; }) => {
          if (event.key === 'Enter') {
              event.preventDefault(); // Prevents the Enter key from creating a new line
          }
      };

      // Add the event listener if the current ref is not null
      titleRef.current?.addEventListener('keydown', handleKeyDown);
      titleRef.current?.addEventListener('focus', handleFocus);

      // Return a cleanup function
      return () => {
          // Remove the event listener if the current ref is not null
          titleRef.current?.removeEventListener('keydown', handleKeyDown);
          titleRef.current?.removeEventListener('focus', handleFocus);
      };
  }, []);

  const handleBlur = () => {
      if (titleRef.current) {
        let text = titleRef.current.textContent || "";
        text = text.replace(/[\n\t]|[^a-zA-Z0-9 ]/g, "");
        if (text === "") { // Check explicitly for empty string
            setCssClass("light-grey");
            titleRef.current.textContent = defaultText; // Reset to default if empty
        }
        else {
            setCssClass("dark-grey");
        }

        setTitle(text || defaultText);
      }
      else {
        setTitle(defaultText);
      }
  };

  return (
      <div>
          <span
              id='title'
              ref={titleRef}
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
                  fontWeight: 700, 
                  fontStyle: 'normal',
                  fontSize: 26
              }}
              suppressContentEditableWarning={true}
          >
              {title}
          </span>
      </div>
  );
}
