import React from 'react';

function ChessBoard() {
  // 8*8
  const chessBoardArray = [];
  const rows = 8;
  const cols = 8;

  for (let i = 0; i <= rows; i++) {
    const squares = [];
    for (let col = 0; col < cols; col++) {
      const isBlack = (i + col) % 2 === 1;
      squares.push(
        <div
          style={{
            background: `${isBlack ? 'black' : 'white'}`,
            height: '50px',
            width: '50px',
          }}
        >
          <p style={{ color: `${isBlack ? 'white' : 'black'}` }}>
            {isBlack ? 'Black' : 'white'}
          </p>
        </div>
      );
    }
    chessBoardArray.push(<div>{squares}</div>);
  }

  return (
    <div
      style={{
        display: 'flex',
        height: 'fit-content',
        width: 'fit-content',
        border: '1px solid red',
      }}
    >
      {chessBoardArray}
    </div>
  );
}

export default ChessBoard;
