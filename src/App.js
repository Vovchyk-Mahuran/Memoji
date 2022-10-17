import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import Card from './components/Card/Card';
import CountDown from './components/CountDown/CountDown';
import GameResult from './components/GameResult/GameResult';
import cardsData from './mocks/cardsData';

function App() {
  const [cards, setCards] = useState([]);
  const [choice, setChoice] = useState({
    first: null,
    second: null,
  });
  const [disabled, setDisabled] = useState(false);
  const [result, setResult] = useState('');
  const [isResultShowed, setIsResultShowed] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const shuffleCards = () => {
    const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
    setChoice({ first: null, second: null });
    setCards(shuffled);
  };

  useEffect(shuffleCards, []);

  const choiceHandler = (card) => {
    if (choice.first) {
      setChoice((prev) => ({
        ...prev,
        second: card,
      }));
    } else {
      setChoice((prev) => ({
        ...prev,
        first: card,
      }));
    }
    if (!isTimerActive) setIsTimerActive(true);
  };

  const resetTurn = () => {
    setChoice({ first: null, second: null });
    setDisabled(false);
  };

  useEffect(() => {
    if (choice.first && choice.second) {
      setDisabled(true);

      if (choice.first.img === choice.second.img) {
        setCards((prevCards) => prevCards.map((card) => {
          if (card.img === choice.first.img || card.img === choice.second.img) {
            return { ...card, matched: true };
          }
          return card;
        }));
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choice]);

  const setLoseStatus = useCallback(() => {
    setResult('lose');
    setIsResultShowed(true);
    setIsTimerActive(false);
  }, [setResult, setIsResultShowed]);

  const resultChecker = () => {
    if (cards.length && cards.every((item) => item.matched === true)) {
      setResult('win');
      setIsResultShowed(true);
      setIsTimerActive(false);
    }
  };

  useEffect(resultChecker, [cards]);

  const closeResult = () => {
    shuffleCards();
    setIsResultShowed(false);
  };

  return (
    <div className="App">
      <h1 className="App__header">Memoji</h1>
      <div className="App__cards">
        {cards.length ? (
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              choiceHandler={choiceHandler}
              flipped={
                  card === choice.first
                  || card === choice.second
                  || card.matched
              }
              disabled={disabled}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <CountDown
        isTimerActive={isTimerActive}
        setLoseStatus={setLoseStatus}
        isResultShowed={isResultShowed}
      />
      <GameResult
        isOpen={isResultShowed}
        closeResult={closeResult}
        result={result}
      />
    </div>
  );
}

export default App;
