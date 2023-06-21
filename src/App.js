// import { useEffect, useState } from 'react';
// import './App.css';


// function App() {
//   // console.log(process.env.REACT_APP_WEATHER_API_KEY)
//   const [currentWeather, setCurrentWeather] = useState({})
//   const [locationKey, setLocationKey] = useState("")
//   const [zipCode, setZipCode] = useState("")

//   const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

//   useEffect(() => {
//     const getData = async () => {
//       const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}search?apikey=${apiKey}&q=77316`)
//       const data = await response.json()
//       console.log(data)
//       setLocationKey()
//     }
//     if (locationKey !== "") getData();
//   },[locationKey])

//   return (
//     <div className="App">
      
//     </div>
//   );
// }

// export default App;


// // "http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=t9VEPoCHgeGUsDbrL5rudholu3l1RHiV&q=77316"


import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Define state variables
  const [currentWeather, setCurrentWeather] = useState({}); // Stores the current weather data
  const [locationKey, setLocationKey] = useState(""); // Stores the location key for the desired weather forecast
  const [zipCode, setZipCode] = useState(""); // Stores the zip code entered by the user

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Retrieve the weather API key from environment variables

  // Event handler for zip code input change
  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value); // Update the zipCode state variable with the entered value
  };

  // Event handler for fetching weather based on zip code
  const handleFetchWeather = async () => {
    // Make a request to the Weather Locations API to get the location data based on the zip code
    const locationResponse = await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${zipCode}`);
    const locationData = await locationResponse.json();
    // check locationData dose the location exist
    if (locationData.length > 0) {
      const key = locationData[0].Key; // Extract the location key from the response
      setLocationKey(key); // Update the locationKey state variable with the extracted key
    }else{ alert("location can not be found")}
  };

  // useEffect hook to fetch weather data when locationKey is set
  useEffect(() => {
    const getData = async () => {
      if (locationKey !== "") {
        // Make a request to the Weather Forecast API using the locationKey
        const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}`);
        const data = await response.json();
          console.log(data)
        setCurrentWeather(data); // Update the currentWeather state variable with the fetched data
      }
    };
    getData();
  }, [locationKey, apiKey]);

  return (
    <div className="App">
      <h1>My weather app</h1>
      <div className='input-div'>
        {/* Input field for entering the zip code */}
        <label htmlFor="input"></label>
        <input type="text" placeholder="Enter Zip Code" value={zipCode} onChange={handleZipCodeChange} />
        {/* Button for fetching weather based on the entered zip code */}
        <button onClick={handleFetchWeather}>Get Weather</button>
      </div>
      {currentWeather.Headline && (
        <div>
          {/* Display the weather data */}
          <h2>{currentWeather.Headline.Text}</h2>
          <h2>{currentWeather.DailyForecasts[0].Day.IconPhrase}</h2>
          <p>Temperature: {currentWeather.DailyForecasts[0].Temperature.Maximum.Value} {currentWeather.DailyForecasts[0].Temperature.Maximum.Unit}</p>

        </div>
      )}
    </div>
  );
}

export default App;