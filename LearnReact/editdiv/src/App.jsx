import "./App.css";
import { useState, useEffect } from "react";

import Editable from "./components/Editable";

function App() {
  const [textList, setTextList] = useState([]);

  useEffect(() => {
    const generatePageLayout = async () => {
      const pageKeys = ["h2/1-5", "p-1", "p-2"];
      let promises = [];
      for (const key of pageKeys) {
        promises.push(fetchText(key));
      }
      const result = await Promise.all(promises);
      setTextList(result);
    };
    generatePageLayout();
  }, []);

  const fetchText = async (type) => {
    const result = await fetch(`http://www.randomtext.me/api/lorem/${type}`);
    const jsonResponse = await result.json();
    return jsonResponse.text_out;
  };

  const handleTextUpdate = (updatedText) => {
    // console.log(updatedText);
  };

  const DisplayText = () => {
    return (
      <>
        {textList.map((text, index) => {
          return (
            <Editable
              value={text}
              onSubmit={handleTextUpdate}
              size={8}
              key={index}
            />
          );
        })}
      </>
    );
  };
  return <DisplayText />;
}

export default App;
