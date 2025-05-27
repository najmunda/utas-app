import React, { useEffect, useRef } from 'react';

export default function TextArea({ ...props }) {
  const textAreaRef = useRef();

  useEffect(() => {
    textAreaRef.current.style.height = '0px';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  });

  return (
    <textarea
      {...props}
      ref={textAreaRef}
      className="overflow-hidden resize-none p-2 border border-neutral-300 rounded-lg"
    />
  );
}
