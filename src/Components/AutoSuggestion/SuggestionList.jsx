import React from 'react';

const SuggestionList = ({
  data = [],
  onItemSelect = null,
  highlightKeyword = null,
  dataKey = null,
}) => {
  const getHighlightWord = (text, highlightKeyword) => {
    const highLightText = text.replace(
      highlightKeyword,
      highlightKeyword.toUpperCase()
    );
    return highLightText;
  };

  return (
    <div>
      {data.map((item, index) => {
        const currSuggestion = dataKey ? item[dataKey] : item;
        return (
          <li
            key={index}
            onClick={() => {
              onItemSelect(item);
            }}
          >
            {getHighlightWord(currSuggestion, highlightKeyword)}
          </li>
        );
      })}
    </div>
  );
};

export default SuggestionList;
