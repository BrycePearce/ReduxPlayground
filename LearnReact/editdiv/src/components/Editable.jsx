import { useRef, useState } from "react";
import useOutsideEvent from "../hooks/useOutsideEvent";

function createMarkup(text) {
  return { __html: text };
}

const Editable = ({ value, onSubmit, useInput, useTextarea, autoSize }) => {
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
      ref={wrapperRef}
      onChange={(e) => setInput(e.target.value)}
      value={input}
    ></textarea>
  );

  const defaultText = (
    <div
      onClick={() => setIsEditable(true)}
      dangerouslySetInnerHTML={createMarkup(input)}
    ></div>
  );

  if (isEditable) {
    return textareaDisplay;
  } else {
    return defaultText;
  }
};

export default Editable;
