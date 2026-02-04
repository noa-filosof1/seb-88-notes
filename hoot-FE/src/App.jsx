import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails';
import * as hootService from './services/hootService';
import HootForm from './components/HootForm/HootForm';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate('/hoots');
  }

  const handleDeleteHoot = async (hootId) => {
    console.log('hootId', hootId);
    const deletedHoot = await hootService.deleteHoot(hootId)
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate('/hoots');
  }

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      setHoots(hootsData)
    } 
    if (user) fetchAllHoots();
  }, [user])
  
  return (
    <>
      <NavBar/>
      <Routes>
        {/* routes available to ALL users  */}
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
          {/* routes available to signed in users*/}
            <Route path='/hoots' element={<HootList hoots={hoots} />} />
            <Route path='/hoots/:hootId' element={<HootDetails handleDeleteHoot={handleDeleteHoot} />} />
            <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot} />} />
          </>
        ) : (
          <>
          {/* Routes not available to signed in users */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
