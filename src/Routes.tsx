import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

import Loading from './components/Loading';
import Application from './pages/Application';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const PrivateRoute = ({ children, redirectTo }: { children: JSX.Element, redirectTo: string }) => {
  let isAuthenticated = localStorage.getItem("keyAcess");
  return isAuthenticated ? children : <Navigate to={redirectTo}/>
}

export default () => {

  const user = useContext(AuthContext);

  return(
    <Routes>
      <Route path="/" element={<Home/>}/>

      <Route path="/app" element={ 
        user ? <PrivateRoute redirectTo="/"><Application/></PrivateRoute> : <Loading/>
      }/>

      <Route path="/profile" element={ 
        user ? <PrivateRoute redirectTo="/"><Profile/></PrivateRoute> : <Loading/>
      }/>

      <Route path="/settings" element={ 
        user ? <PrivateRoute redirectTo="/"><Settings/></PrivateRoute> : <Loading/>
      }/>
    </Routes>
  );
}