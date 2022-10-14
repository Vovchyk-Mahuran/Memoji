import classNames from 'classnames';
import React from 'react';
import classes from './GameResult.module.scss';

function GameResult({ result, isOpen, closeResult }) {
  const modalClasses = classNames(
    classes.modal,
    { [`${classes.active}`]: isOpen },
  );
  const modalContentClasses = classNames(
    classes.modal__content,
    classes.content,
    { [`${classes.active}`]: isOpen },
  );
  return (
    <div className={modalClasses}>
      <div className={modalContentClasses}>
        <span className={`${classes.content__result}`}>{result.toUpperCase()}</span>
        <button type="button" onClick={closeResult} className={`${classes.content__btn}`}>
          {result === 'win' ? 'Play again' : 'Try Again'}
        </button>
      </div>
    </div>
  );
}

export default GameResult;
