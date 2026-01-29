// user to be able to enter a name of a city 
// submit a form/search 
// at some point, have the data from this city returned to us
import { useState } from "react";

const WeatherSearch = (props) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchData(city);
    // fetch will go here
    setCity('');
  }

  return (
    <section>
      <h2>Search</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Enter a City</label>
        <input 
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default WeatherSearch;