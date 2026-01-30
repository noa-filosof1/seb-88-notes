import PokemonList from "./components/PokemonList/PokemonList"
import NavBar from "./components/NavBar/NavBar";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import PokemonForm from "./components/PokemonForm/PokemonForm";
import { useState } from "react"
import { Route, Routes } from 'react-router';

const initialState = [
  { _id: 1, name: 'bulbasaur', weight: 69, height: 7 },
  { _id: 2, name: 'ivysaur', weight: 130, height: 10 },
  { _id: 3, name: 'venusaur', weight: 1000, height: 20 },
  { _id: 4, name: 'charmander', weight: 85, height: 6 },
  { _id: 5, name: 'charmeleon', weight: 190, height: 11 },
];

const App = () => {
  const [pokemon, setPokemon] = useState(initialState);

  const addPokemon = (newPokemonData) => {
    newPokemonData._id = pokemon.length + 1;
    setPokemon([...pokemon, newPokemonData]);
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path='/pokemon' element={<PokemonList pokemon={pokemon} />} />
        <Route path="/pokemon/new" element={<PokemonForm addPokemon={addPokemon} />} />
        <Route path='/pokemon/:pokemonId' element={<PokemonDetails pokemon={pokemon} />} />
        <Route path='*' element={<h2>Whoops! Nothing here!</h2>} />
      </Routes>
    </>
  )
}

export default App

// anchor tag - not available to us in React
// react router <Link> (component) - allows user to change path of a browser URL with a click 
// <Link to='/'>


// in order to build routes, we have 2 components 
// <Route> used to define the individual route within the application
// specified a path and an element to render

// <Routes> acts as a container for each individual route component 
//


// Route Parameters
// /pokemon/1


// route order
// exact match to the route path ('/')
// exact match on a specific path ('/pokemon')
// exact match on a specific sub path ('/pokemon/new')
// exact match on a dynamic route sub path ('/pokemon/:pokemonID')
// a catch all route ('/*')