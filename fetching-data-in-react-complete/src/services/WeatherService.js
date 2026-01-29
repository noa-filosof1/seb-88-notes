// api key
// base url
const API_KEY = 'b9314c1fb6ea4b40810161636262701';
const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`

const show = async (city) => {
  try {
    const queryString = `&q=${city}`;
    const res = await fetch(BASE_URL + queryString);
    const data = await res.json();
    // console.log('data:', data);
    return data;
  } catch (error) {
    console.log(error)
  }
}

// show('London'); remove this call 

export { show };


// fetch() - async/await