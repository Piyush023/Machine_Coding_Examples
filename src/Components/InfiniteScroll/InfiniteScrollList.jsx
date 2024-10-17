/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';

const InfiniteScrollList = (props) => {
  // These items will be passed as props to the List.
  const { renderItem, listData, getData, query } = props;

  const pageNumber = useRef(1); // This is for the pageNumber passed to the getData function for the paginated data call.
  const [loading, setLoading] = useState(false); // Also need to show a loading Text for that we need a state for the loading.

  const fetchData = useCallback(() => {
    if (!query) {
      setLoading(true);
      getData(query, pageNumber.current).finally(() => {
        // This will return a Promise
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const observer = useRef();
  const lastElementObserver = useCallback((node) => {
    if (loading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((enteries) => {
      if (enteries[0].isIntersecting) {
        pageNumber.current += 1;
        fetchData();
      }
    });
    if (node) observer.current.observe(node);
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {listData.map((item, index) => {
        if (index === listData.length - 1)
          return renderItem(
            { date: item.date, tweet: item.tweet, twitter_id: item.twitter_id },
            item.index,
            lastElementObserver
          );
        return renderItem(
          { date: item.date, tweet: item.tweet, twitter_id: item.twitter_id },
          item.index,
          null
        );
      })}
      {loading ? 'LOADING' : ''}
    </div>
  );
};

export default InfiniteScrollList;
