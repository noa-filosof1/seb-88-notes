# 🧠 5 API Tasks with DOM Manipulation

Each task requires:
- Fetching data from a public API  
- Parsing JSON  
- Dynamically updating the DOM to display the result

---

### Note: ###
We have given you a targeted `<section>` element for each problem, however you are free to update the `index.html` file as you wish, or you can generate everything dynamically using the DOM. It's totally up to you!

## ✅ 1. Chuck Norris Joke Generator

**API Endpoint:** `https://api.chucknorris.io/jokes/random`  
**Documentation:** https://api.chucknorris.io/

**Task:**  
Create a webpage with a "Get Joke" button. When clicked:
- fetch a random Chuck Norris joke
- display the joke inside a `<div>` element. 
**Bonus:** Add an input to search for jokes by keyword using `/jokes/search?query={query}`.

---

## ✅ 2. Weather by City (WeatherAPI.com)

**API Endpoint:** `http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=London`  
**Documentation:** https://www.weatherapi.com/docs/

**(Sign up / API key required)**

**Task:**  
Create a simple form where the user enters a city name. On submission, display:
- Temperature (`temp_c`)
- Weather condition (`condition.text`)
- Icon (`condition.icon`)
All displayed dynamically using DOM elements.

---

## ✅ 3. NASA Astronomy Picture of the Day

**API Endpoint:** `https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY`
**Documentation:** https://api.nasa.gov/

**(Sign up / API key required)**

**Task:**  
On page load, fetch the APOD data. Display:
- The image (`<img>`)
- The title (`<h2>`)
- The explanation (`<p>`)

This API has optional parameters such as `date`, `start_date`, `end_date` and `count`. As a bonus - try to display the APOD from your birthday (from this year or last), or show a number of images between a date range.

---

## ✅ 4. Country Info Lookup (REST Countries)

**API Endpoint:** `https://restcountries.com/v3.1/name/{country}`
**Documentation:** https://restcountries.com/

**Task:**  
Create an input where a user types a country name. On click of a "Search" button, display:
- Capital city  
- Population  
- List of languages  
Use DOM elements to render this information clearly.

**Bonus:**
If an invalid city is entered, display `Country not found` in a `<p>` tag.

---

## ✅ 5. Cat Facts API

- **API:** `https://catfact.ninja/fact`  
- **Docs:** https://catfact.ninja/

**Task:**  
- Add a "Get Cat Fact" button.  
- When clicked, fetch a random cat fact from the API.  
- Display the fact inside a `<div>` on the page using the DOM.  
- **Bonus:** Style the output as a quote or speech bubble using CSS.

---

## Explanation

Remember that to make a call to an external API, we'll use the JavaScript native [Fetch API](https://www.w3schools.com/jsref/api_fetch.asp).

This is a two step process:
1. Make the call to the API to request the data, `await`ing the response.
2. Next, parse the JSON body of the response, again `await`ing it's completion.

Here is a generic example:
```js
async function fetchData(){
  try {
    // Fetch the response
    const response = await fetch('https://some-api-endpoint.com')
    // Check for an error response
    if (!response.ok) throw new Error('Something went wrong')
    // Then parse the JSON data
    const data = await response.json()
    // Your data is now available on the `data` variable, inject it into the DOM!
  } catch (err) {
    console.log(err)
  }
}
```

## Hints

### event.preventDefault()
If you decide to use a `<form>` element to submit any user input, then don't forget to use the [preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) method to stop the page from reloading. This is needed because the default behaviour of a form submission is to send a HTTP request to a server. If you don't provide an action, then the request is sent to the current page. This can sometimes be useful for filtering, however in this case, we should use `event.preventDefault()` to stop the page reloading so we can extract data from the form fields directly.