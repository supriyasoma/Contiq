import React from "react";
import theme from "../theme";

interface FormatStringProps {
  inputString: string;
  matchedKeyword: string;
}

const FormatStringWithBoldKeyword: React.FC<FormatStringProps> = ({
  inputString,
  matchedKeyword,
}) => {
  const parts = inputString.split(
    new RegExp(`\\b(${matchedKeyword})\\b`, "gi")
  );

  const formattedString = parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <b key={index} style={{ color: theme.palette.text.black }}>
          {part}
        </b>
      );
    }
    return part;
  });

  return <>{formattedString}</>;
};

export default FormatStringWithBoldKeyword;
