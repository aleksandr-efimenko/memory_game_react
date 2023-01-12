import { useState, useEffect } from 'react';
import { cardImages } from './components/Images';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

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
    </div>
  );
}

export default App;
