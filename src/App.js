import React from 'react';
import './App.css';
import Home from './components/home'; 
import {Routes, Route} from 'react-router-dom';
import DetailsPage from './components/detailsPage'
import NavBar from './components/navBar';
const App = () => {
  return (
    <Routes>
      <Route 
        exact path="/" 
        element={
          <>
            <NavBar/>
            <Home />
          </>
        } />
      <Route 
        exact path="/DetailsPage" 
        element={
          <>
            <NavBar />
            <DetailsPage />
          </>
        } />
    </Routes>
  );
}

export default App;
