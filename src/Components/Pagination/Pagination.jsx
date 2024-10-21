import React, { useEffect, useState } from 'react';

const Pagination = () => {
  const [prod, setProd] = useState([]);
  const [page, setPage] = useState(1);

  const getProduct = async () => {
    const data = await fetch('https://dummyjson.com/products?limit=100');
    const res = await data.json();
    if (res && res.products) {
      setProd(res.products);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const setPageHandler = (index) => {
    if (index !== page && index >= 1 && index <= prod.length / 10) {
      setPage(index);
    }
  };

  return (
    <div>
      {prod.slice(page * 10 - 10, page * 10).map((item, index) => {
        return (
          <span key={index}>
            <img src={item.thumbnail} alt={'img'} />
            <div>
              {item.title}
              {item.price}
              {item.rating}
            </div>
          </span>
        );
      })}
      {prod.length > 0 && (
        <>
          <span
            onClick={() => {
              setPageHandler(page - 1);
            }}
          >
            ◀️
          </span>
          {[...Array(prod.length / 10)].map((_, index) => {
            return (
              <span
                onClick={() => {
                  setPageHandler(index + 1);
                }}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            onClick={() => {
              setPageHandler(page + 1);
            }}
          >
            ▶️
          </span>
        </>
      )}
    </div>
  );
};

export default Pagination;
