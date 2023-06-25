import React from 'react';
import Card from './Card';

const AllCards = ({ allCards, setZipCode}) => {

  return (
    <div className='card-container' >
        { allCards.map((card) => (
        <Card key={card.id} card={card} setZipCode={setZipCode} />
        ))}
    </div>
  )
}

export default AllCards
