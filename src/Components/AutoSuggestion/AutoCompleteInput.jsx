/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import SuggestionList from './SuggestionList';

const AutoCompleteInput = ({
  placeHolder = '',
  staticData = null,
  getData = null,
  dataKey = '',
  loader = null,
  onItemSelect = null,
  onChange = null,
  onBlur = null,
  onFocus = null,
}) => {
  const [input, setInput] = useState('');
  const [autoSuggestion, setAutoSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestion = async (query) => {
    setLoading(true);
    try {
      let res;
      if (!staticData) {
        res = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
        setAutoSuggestion(res);
      } else if (getData) {
        res = await getData(query);
        setAutoSuggestion(res);
      }
    } catch (e) {
      setError('Failed To Get Any Data');
      setAutoSuggestion([]);
    } finally {
      setLoading(false);
    }
  };

  const debounce = function (cb, wait) {
    console.log('func');
    let timer = null;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (timer) {
          cb.apply(context, args);
        }
      }, wait);
    };
  };

  const getDebounceCall = useCallback(
    debounce((input) => getSuggestion(input), 500),
    []
  );

  useEffect(() => {
    if (input.length > 1) {
      // need to implement debounce here -
      getDebounceCall(input);
    } else {
      setAutoSuggestion([]);
    }
  }, [input]);

  const onSuggestionSelect = (autoSuggestion) => {
    setInput(dataKey ? autoSuggestion[dataKey] : dataKey);
    onItemSelect(autoSuggestion);
    setAutoSuggestion([]);
  };

  return (
    <div>
      <input
        type={'text'}
        placeholder={placeHolder}
        onChange={(e) => onChangeHandler(e)}
        value={input}
        onBlur={() => onBlur}
        onFocus={() => onFocus}
      />
      {(autoSuggestion.length > 0 || loading || error) && (
        <ul>
          {error && <div>{Error}</div>}
          {loading && <div>{loader}</div>}
          <SuggestionList
            data={autoSuggestion}
            onItemSelect={onSuggestionSelect}
            highlightKeyword={input}
            dataKey={dataKey}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
