import { useState, useEffect } from 'react';
import cardImages from './components/Images';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';


function App() {
  const [cards, setCards] = useState([]); // state variable to keep track of all cards
  const [turns, setTurns] = useState(0); // state variable to keep track of the number of turns
  const [choiceOne, setChoiceOne] = useState(null); // state variable to store the first selected card
  const [choiceTwo, setChoiceTwo] = useState(null); // state variable to store the second selected card
  const [disabled, setDisabled] = useState(false); // state variable to keep track of if the cards are clickable or not

  // state variables to check if the player wins or loses
  const [winner, setWinner] = useState(null);
  const [exceeds, setExceeds] = useState(null);

  // function to handle the selection of a card
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // function to shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0); // reset turns
    setWinner(false); // reset winner status
    setExceeds(false); // reset exceeded turns status
    setDisabled(false); // reset cards clickable status
    setChoiceOne(null); // reset selected card 1
    setChoiceTwo(null); // reset selected card 2
  }

  // function to reset the state after checking 2 cards
  const backToDefault = () => {
    setChoiceOne(null); // reset selected card 1
    setChoiceTwo(null); // reset selected card 2
    setDisabled(false); // set cards clickable
    setTurns((prevTurns) => prevTurns + 1); // increment turns
  }

  // useEffect hook to shuffle the cards only at first render
  useEffect(() => {
    shuffleCards();
  }, [])

  // useEffect hook to check if the two selected cards match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true); // set cards not clickable
      if (choiceOne.src === choiceTwo.src) { // if the two cards match
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }; // mark the cards as matched
            } else {
              return card;
            };
          })
        })
        backToDefault(); // reset the state
      } else {
        setTimeout(() => backToDefault(), 500); // wait for half a second before resetting the state
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    setTimeout(() => {
      const allMatched = cards.every((card) => card.matched === true);
      if (turns >= 15) {  // check if the number of turns is greater than or equal to 15
        if (allMatched && turns === 15) { // if all cards are matched and the number of turns is 15
          setWinner(true); // set the winner status to true
        } else {
          setExceeds(true); // set exceeded turns status to true
          setDisabled(true); // set cards not clickable
        }
      } else if (allMatched && cards.length > 0) {
        setWinner(true); // if all cards are matched and the number of turns is less than 15, set the winner status to true
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


