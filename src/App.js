import { useState, useEffect } from 'react';
import { cardImages } from './Components/Images';
import Header from './Components/Header';
import Grid from './Components/Grid';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

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
  }

  // Call the function to shuffle cards only at first render
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <Header turns={turns} onShuffle={shuffleCards} />
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
