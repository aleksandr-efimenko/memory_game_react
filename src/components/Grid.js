import React from 'react'
import Card from './Card'

export default function Grid({ cards, choiceOne, choiceTwo, disabled, handleChoice }) {
  return (
    <div className='card-grid'>
      {cards.map((card) =>
        <div className='card' key={card.id}>
          <Card
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled}
            />
        </div>)
      }
    </div>
  )
}
