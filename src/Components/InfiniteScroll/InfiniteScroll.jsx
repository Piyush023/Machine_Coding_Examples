import React, { useCallback, useState } from 'react';
import InfiniteScrollList from './InfiniteScrollList';

const InfiniteScroll = () => {
  const [query, setQuery] = useState();
  const [data, setData] = useState([]);

  const onChangeHandler = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const renderItem = useCallback(({ date, tweet }, key, ref) => {
    return (
      <div ref={ref} key={key}>
        {date} - {tweet}
        <br />
      </div>
    );
  }, []);

  const getData = useCallback((query, pageNumber) => {
    return new Promise(async (resolve, reject) => {
      const url = `https://bill-gates-tweet-archive-api.p.rapidapi.com/api/tweets?page=${pageNumber}&per_page=${50}&year=${query}`;

      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'bill-gates-tweet-archive-api.p.rapidapi.com',
          'x-rapidapi-key':
            '90d89abdffmsh59ce4f737135dbap1167c0jsn8b79a1629dbe',
        },
      };
      try {
        const pro = await fetch(url, options); // This is for the Query params we need to pass for the search query along with the pageNumber
        const res = await pro.json();
        setData((prev) => [...prev, ...res.tweets]);
        resolve();
      } catch (err) {
        reject();
        throw new Error('Error in the API');
      }
    });
  }, []);

  return (
    <div>
      <label>Input Query: </label>
      <input
        type={'text'}
        value={query}
        onChange={(e) => {
          onChangeHandler(e);
        }}
      />
      {/* The Items passed are for the ItemUI, Query for the Search, getDate for the API Call and the listData for the showing the list. */}
      <InfiniteScrollList
        query={query}
        getData={getData}
        listData={data}
        renderItem={renderItem}
      />
    </div>
  );
};

export default InfiniteScroll;
