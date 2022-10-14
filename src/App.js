import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import CountDown from './components/CountDown/CountDown';
import GameResult from './components/GameResult/GameResult';
import cardsData from './mocks/cardsData';

function App() {
  const [cards, setCards] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [result, setResult] = useState('');
  const [isResultShowed, setIsResultShowed] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const shuffleCards = () => {
    const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
    setFirst(null);
    setSecond(null);
    setCards(shuffled);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const choiceHandler = (card) => {
    if (first) {
      setSecond(card);
    } else {
      setFirst(card);
    }
  };

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (first) setIsTimerActive(true);
  }, [first]);

  useEffect(() => {
    if (first && second) {
      setDisabled(true);

      if (first.img === second.img) {
        setCards((prevCards) => prevCards.map((card) => {
          if (card.img === first.img || card.img === second.img) {
            return { ...card, matched: true };
          }
          return card;
        }));
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [first, second]);

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

  useEffect(() => {
    resultChecker();
  }, [cards]);

  const closeResult = () => {
    shuffleCards();
    setIsResultShowed(false);
  };

  return (
    <div className="App">
      <h1 className="App__header">Memoji</h1>
      <div className="cards">
        {cards.length ? (
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              choiceHandler={choiceHandler}
              flipped={
                  card === first
                  || card === second
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
