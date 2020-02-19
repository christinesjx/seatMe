import React from 'react';
import './App.css';
import SignIn from '../src/Component/customerSide/SignIn/signIn';
import SearchBar from './Component/customerSide/SearchBar/SearchBar';

function App() {
  return (
    <div>
      <SearchBar/>
      <SignIn/>
    </div>

    
  );
}

export default App;
