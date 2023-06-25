import React, { useState, useEffect } from 'react';
import './App.css';
import AllCards from './components/AllCards';
 
function App() {
  const cities = [
    { id: 1, city: 'New York City', zipCode: '10001', image: 'https://tse3.mm.bing.net/th?id=OIP.XdsE3WJwBpiuOr2TsRP8IAHaEs&pid=Api&P=0&h=180' },
    { id: 2, city: 'Los Angeles', zipCode: '90001', image: 'https://tse3.mm.bing.net/th?id=OIP.oQTDKH6nJHuBtVCGgRoUWgHaE7&pid=Api&P=0&h=180' },
    { id: 3, city: 'Chicago', zipCode: '60601', image: 'https://tse3.mm.bing.net/th?id=OIP.zBLaeC29NrRVTsVP4Vu5SQHaEo&pid=Api&P=0&h=180' },
    { id: 4, city: 'Houston', zipCode: '77001', image: 'https://tse4.mm.bing.net/th?id=OIP.cpVhXbg_Jex8Vk9uvSMIsQHaD2&pid=Api&P=0&h=180' },
    { id: 5, city: 'Phoenix', zipCode: '85001', image: 'https://tse1.mm.bing.net/th?id=OIP.EriTzscEDU0GZmuMLO5nbwHaE5&pid=Api&P=0&h=180' },
    { id: 6, city: 'Philadelphia', zipCode: '19101', image: 'https://tse3.mm.bing.net/th?id=OIP.2KYIHwnhrZ8ih0nQd7W4_QHaEJ&pid=Api&P=0&h=180' },
    { id: 7, city: 'San Antonio', zipCode: '78201', image: 'https://tse1.mm.bing.net/th?id=OIP.3F35IJgkFeXuFH37gXJNQAHaEo&pid=Api&P=0&h=180' },
    { id: 8, city: 'San Diego', zipCode: '92101', image: 'https://tse1.mm.bing.net/th?id=OIP.9cmT4QgUi8vcM55wMdmBlwHaEU&pid=Api&P=0&h=180' },
    { id: 9, city: 'Dallas', zipCode: '75201', image: 'https://tse3.mm.bing.net/th?id=OIP.L2Swyi8TfC1DVoxVQINf3gHaE7&pid=Api&P=0&h=180' },
    { id: 10, city: 'San Jose', zipCode: '95101', image: 'https://tse1.mm.bing.net/th?id=OIP.s_4xbm93NFzB1M6LAQ3ROgHaF1&pid=Api&P=0&h=180' }
  ];
  
  // Define state variables
  const [currentWeather, setCurrentWeather] = useState({}); // Stores the current weather data 
  const [locationKey, setLocationKey] = useState(""); // Stores the location key for the desired weather forecast
  const [zipCode, setZipCode] = useState("77316"); // Stores the zip code entered by the user
  const [currentCity, setCurrentCity] = useState("");
  const [input, setInput] = useState("");
  const [allCards] = useState(cities)

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Retrieve the weather API key from environment variables

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${zipCode}`)
      const data = await response.json();
      setLocationKey(data[0].Key)
      setCurrentCity(data[0])
    };
    getData();
  },[zipCode]);

  // useEffect hook to fetch weather data when locationKey is set
  useEffect(() => {
    const getData = async () => {
        // Make a request to the Weather Forecast API using the locationKey
        const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}`);
        const data = await response.json();
          //console.log(data)
        setCurrentWeather(data); // Update the currentWeather state variable with the fetched data
    };
    if (locationKey !== "") getData();
  }, [locationKey]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setZipCode(input)
  }


  return (
    <div className="App">
      <h1>My weather app</h1>

      <form onSubmit={handleOnSubmit} className='input-div'>
        {/* Input field for entering the zip code */}
        <input type="text" placeholder="Enter Zip Code" value={input} onChange={ (e) => setInput(e.target.value)} />
        {/* Button for fetching weather based on the entered zip code */}
        <button>submit</button>
      </form>

      {currentWeather.Headline && (
        <div className='weatherDiv'>
          {/* Display the weather data */}
          <h1>{currentCity.EnglishName}</h1>
          <h2>{currentWeather.Headline.Text}</h2>
          <h2>{currentWeather.DailyForecasts[0].Day.IconPhrase}</h2>
          <p>Temperature: {currentWeather.DailyForecasts[0].Temperature.Maximum.Value} {currentWeather.DailyForecasts[0].Temperature.Maximum.Unit}</p>

        </div>
      )}

      <div className="container">
        <AllCards allCards={allCards} setZipCode={setZipCode}/>
      </div>
      
    </div>
  );
}

export default App;
