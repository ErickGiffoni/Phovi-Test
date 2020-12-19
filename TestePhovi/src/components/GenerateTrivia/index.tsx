import React from "react";

import "./styles.css";
import { MdContentCopy } from "react-icons/md";

interface GenerateTriviaProps {
  textAreaRef: any;
  generatedTrivia: string;
  rows: number;
  copyToClipboard: Function;
}

const GenerateTrivia: React.FC<GenerateTriviaProps> = ({
  textAreaRef,
  generatedTrivia,
  rows,
  copyToClipboard,
}) => {
  return (
    <div className="generateContainer">
      <button
        type="button"
        className="button-icon button-default"
        onClick={(e) => copyToClipboard(e)}
      >
        Copy
        <MdContentCopy />
      </button>

      <textarea
        ref={textAreaRef}
        rows={rows}
        value={generatedTrivia}
        onChange={() => {}}
      />
    </div>
  );
};

export default GenerateTrivia;
