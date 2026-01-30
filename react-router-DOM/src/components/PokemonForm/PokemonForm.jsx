import { useState } from "react";
import { useNavigate } from "react-router";

const initialState = {
  name: '',
  weight: 0,
  height: 0,
}

const PokemonForm = (props) => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate(); // create an instance of useNavigate()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // complete submit logic
    props.addPokemon(formData);
    setFormData(initialState);
    navigate('/pokemon');
  }

  const handleChange = ({ target }) => {
    setFormData({...formData, [target.name]: target.value});
  }
  console.log('form data', formData)

  return (
    <main>
      <h2>New Pokemon</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        />
        <label htmlFor="name">weight:</label>
        <input 
        type="text"
        id="weight"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        />
         <label htmlFor="name">Height:</label>
        <input 
        type="text"
        id="height"
        name="height"
        value={formData.height}
        onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default PokemonForm