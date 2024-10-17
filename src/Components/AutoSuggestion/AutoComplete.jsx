import React from 'react';
import AutoCompleteInput from './AutoCompleteInput';

// 'https://dummyjson.com/recipes/search'
const AutoComplete = (props) => {
  const staticData = [
    'apple',
    'banana',
    'berry',
    'orange',
    'grape',
    'mango',
    'melon',
    'berry',
    'peach',
    'cherry',
    'plum',
  ];

  const getData = async (query) => {
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    if (!res.ok) {
      throw new Error('The Response is Bad');
    }
    const updatedRes = await res.json();
    return updatedRes.recipes;
  };

  return (
    <div>
      <h1>AutoComplete</h1>
      <AutoCompleteInput
        placeHolder={'Enter Input'}
        staticData={staticData}
        getData={getData}
        dataKey={'name'}
        loader={<div>Loading...</div>}
        onItemSelect={() => {}}
        onChange={(input) => {}}
        onBlur={() => {}}
        onFocus={() => {}}
      />
    </div>
  );
};

export default AutoComplete;
