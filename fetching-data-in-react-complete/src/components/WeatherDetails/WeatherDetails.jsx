const WeatherDetails = (props) => {
  // console.log('weather props', props);
  return (
    <section>
      <h2>Weather Details</h2>
      <p>Location: {props.weather.location}</p>
      <p>Temperature: {props.weather.temperature} </p>
      <p>Condition: {props.weather.condition} </p>
    </section>
  )
}

export default WeatherDetails;