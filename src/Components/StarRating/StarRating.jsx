import React, { useState } from 'react';

const StarRating = () => {
  const [filled, setFilled] = useState(0);
  const [hoverFilled, setHoverFilled] = useState(0);

  return (
    <div className='container'>
      <h1>Star Rating Component</h1>
      <div className='star-container'>
        {[...Array(5)].map((_, index) => {
          return (
            <span
              className={
                index + 1 <= filled || index + 1 <= hoverFilled
                  ? 'star-filled'
                  : 'star'
              }
              key={index}
              onMouseOver={() => {
                setHoverFilled(index + 1);
              }}
              onMouseOut={() => {
                setHoverFilled(0);
              }}
              onClick={() => {
                setFilled(index + 1);
              }}
            >
              &#9733;
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
