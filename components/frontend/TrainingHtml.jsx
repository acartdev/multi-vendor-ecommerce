import React from "react";
import parse from "html-react-parser";
export default function TrainingHtml({content}) {
  return <div className="mt-3"> {parse(`${content}`)}</div>;
}
