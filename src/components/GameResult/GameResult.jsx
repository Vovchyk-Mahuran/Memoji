import React from 'react';
import './GameResult.css';

// eslint-disable-next-line react/prop-types
function GameResult({ result, isOpen, closeResult }) {
  return (
    <div className={isOpen ? 'modal active' : 'modal'}>
      <div className={isOpen ? 'modal__content content active' : 'modal__content content'}>
        {/* eslint-disable-next-line react/prop-types */}
        <span className="content__result">{result.toUpperCase()}</span>
        <button type="button" onClick={closeResult} className="content__tryAgain">
          {result === 'win' ? 'Play again' : 'Try Again'}
        </button>
      </div>
    </div>
  );
}

export default GameResult;
