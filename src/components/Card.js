import React from 'react'

const Card = ({ card, setZipCode }) => {
    const { city, zipCode, image } = card
    
    const handleOnClick = async (zipCode) => {
        await setZipCode(zipCode);
      };
      

  return (
    <div className='city-card'>
        <h1>{city}</h1>
        <img src={image} alt="city" />
        <br />
        <button value={zipCode} onClick={() => handleOnClick(zipCode)} >get weather</button>
    </div>
  )
}

export default Card
