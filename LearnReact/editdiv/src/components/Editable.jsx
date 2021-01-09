import { useRef, useState } from "react";
import useOutsideEvent from "../hooks/useOutsideEvent";

function createMarkup(text) {
  return { __html: text };
}

const Editable = ({ value, onSubmit, useTextarea, size }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [input, setInput] = useState(value);

  const wrapperRef = useRef(null);

  useOutsideEvent(wrapperRef, isEditable, () => {
    setIsEditable(false);
    onSubmit(input);
  });

  const textareaDisplay = (
    <textarea
      type="text"
      rows={size}
      ref={wrapperRef}
      onChange={(e) => setInput(e.target.value)}
      value={input}
    ></textarea>
  );

  const inputDisplay = (
    <input
      type="text"
      size={size * 8}
      ref={wrapperRef}
      onChange={(e) => setInput(e.target.value)}
      value={input}
    />
  );

  const defaultTextDisplay = (
    <div
      onClick={() => setIsEditable(true)}
      dangerouslySetInnerHTML={createMarkup(input)}
    ></div>
  );

  if (isEditable) {
    if (useTextarea) {
      return textareaDisplay;
    } else {
      return inputDisplay;
    }
  } else {
    return defaultTextDisplay;
  }
};

export default Editable;
