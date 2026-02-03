import { createContext, useState } from "react";

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  // token stored as a variable in encoded form
  if (!token) return null;
  // convert into a json object + decode
  return JSON.parse(atob(token.split('.')[1])).payload;
}

function UserProvider({ children }) {
  // create userState
  const [user, setUser] = useState(getUserFromToken());

  const value = { user, setUser }

  return (
    <UserContext.Provider value={value} >
      {/* value now works as data we pass to the value prop */}
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext };
