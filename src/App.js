import { useState, useEffect } from 'react';
import cardImages from './components/Images';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //check winner
  const [winner, setWinner] = useState(null);
  const [exceeds, setExceeds] = useState(null);

  // Handle Choice by adding the clicked cards in the two slot state defined
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setWinner(false);
    setExceeds(false);
    setDisabled(false);
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  // Reset after checking 2 cards
  const backToDefault = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((prevTurns) => prevTurns + 1);
  }

  // Call the function to shuffle cards only at first render
  useEffect(() => {
    shuffleCards();
  }, [])

  // Check if the two cards clicked are matching
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            };
          })
        })
        backToDefault();
      } else {
        setTimeout(() => backToDefault(), 500);
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    setTimeout(() => {
      const allMatched = cards.every((card) => card.matched === true);
      if (turns >= 15) {
        if (allMatched && turns === 15) {
          setWinner(true);
        } else {
          setExceeds(true);
          setDisabled(true);
        }
      } else if (allMatched && cards.length > 0) {
        setWinner(true);
      }
    }, 500);
  }, [turns, cards, winner])
  return (
    <div className="App">
      <Header turns={turns} onShuffle={shuffleCards} />
      {winner ? <div className='result'>Congratulations, You win!!</div> : <></>}
      {exceeds ? <div className='result'>You are out of turns!:(</div> : <></>}
      <Grid
        cards={cards}
        choiceOne={choiceOne}
        choiceTwo={choiceTwo}
        disabled={disabled}
        handleChoice={handleChoice}
      />
    </div>
  );
}

export default App;
