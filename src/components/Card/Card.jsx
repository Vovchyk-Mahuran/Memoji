import React from 'react';
import './Card.css';

function Card({
// eslint-disable-next-line react/prop-types
  card, choiceHandler, flipped, disabled,
}) {
  let cardClasses = '';

  // eslint-disable-next-line react/prop-types
  if (card?.matched) {
    cardClasses = 'correct';
  } else {
    cardClasses = 'wrong';
  }

  const clickHandler = () => {
    if (!disabled) choiceHandler(card);
  };
  return (
    <div className="card__wrapper">
      <div className={flipped ? `card flipped ${cardClasses}` : 'card'}>
        {/* eslint-disable-next-line react/prop-types */}
        <img className="front" src={card?.img} alt="front card" />
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className="back" onClick={clickHandler} />
      </div>
    </div>
  );
}

export default Card;
