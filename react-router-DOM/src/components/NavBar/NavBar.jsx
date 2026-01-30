// I want a navbar to have:
// home 
// pokemon 
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/pokemon'>Pokemon</Link>
        </li>
        <li>
          <Link to='/pokemon/new'>New Pokemon</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;

// we want to use the Link component
// pokemon nav to link to '/pokemon'