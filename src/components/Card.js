import React from 'react';
import Educative from '../Images/EducativeIcon.png';

export default function Card({ card, flipped, disabled, handleChoice }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  }
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img 
        src={Educative} 
        onClick={handleClick}
        alt="card back"
        className="back" />
      </div>
    </div>
  )
}
