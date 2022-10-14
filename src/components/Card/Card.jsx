import classNames from 'classnames';
import React from 'react';
import classes from './Card.module.scss';

function Card({
  card, choiceHandler, flipped, disabled,
}) {
  const cardClasses = classNames(
    classes.card,
    {
      [classes.flipped]: flipped,
      [classes.correct]: card?.matched,
      [classes.wrong]: !card?.matched,
    },
  );

  const clickHandler = () => {
    if (!disabled) choiceHandler(card);
  };
  return (
    <div className={classes.card__wrapper}>
      <div className={cardClasses}>
        <img className={classes.front} src={card?.img} alt="front card" />
        <div role="presentation" className={classes.back} onKeyDown={clickHandler} onClick={clickHandler} />
      </div>
    </div>
  );
}

export default Card;
