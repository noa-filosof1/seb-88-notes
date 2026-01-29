import * as WeatherService from './services/WeatherService';
// this will import everything and export from the weatherServices and group them inside a weatherService object
// whenever we require this function we can access it through dot notation
import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import { useState, useEffect } from 'react';

const App = () => {
  const [weather, setWeather] = useState({});

  const fetchData = async (city) => {
    const data = await WeatherService.show(city);
    const newWeatherState = {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    }
    setWeather(newWeatherState);

  }
  console.log('weather state', weather);

  useEffect(() => {
    // define a fetch function for our default data 
    const fetchDefaultData = async () => {
      const data = await WeatherService.show('New York');
      const newWeatherState = {
        location: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
      }
      setWeather(newWeatherState);
      // console.log('what is the data', data);
    }
    fetchDefaultData();
  }, []); // run once after the initial render

  return (
    <>
      <h1>Weather API!</h1>
      <WeatherSearch fetchData={fetchData} />
      <WeatherDetails weather={weather} />
    </>
  );
}

export default App

// AJAX
// Asynchronous Javascript + XML 
// SPAs (e.g. google maps) 

// fetch()
// web API

// services 
// src/services/bookService.js
// src/services/weatherService.js
//

// * is an asterisk



// useEffect() - anatomy of this
// useEffect(() => {

// }, [dependency])
// anonymous callback function - where you execute a sideeffect such as the data fetching 
// common to have a separate function in here to handle fetching data 
// also common to utilise a setState()

// dependency array [] - this optional
// contain variables or pieces of state - upon these things changing, it will cause the useEffect to call the callback function 
// any value inside the callback which may change, will want to be included as a dependency 

// default behaviour is to be executed when the component is rendered/re-rendered - 
// but this can be controlled with the dependency 
// if the dependency array is left out - it will run after every render
// if we leave the dependency array empty [] - this will run ONCE after the initial render
// if dependency is included - this will run whenever the dependency data changes 

