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
      // This (getData) will return a Promise -
      getData(query, pageNumber.current).finally(() => {
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // This is for the Infinite Scroll
  const observer = useRef();
  // This will check if the element is the last element or not and if it is last then it will make a api call on the basis of the new IntersectionObserver object and if it is not the last element it will disconnect the observer and reset its value. All of this is checked on the basis of the node.
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
