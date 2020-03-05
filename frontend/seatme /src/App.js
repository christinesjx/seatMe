import React from 'react';
import './App.css';

import SearchBar from './Component/customerSide/SearchBar/SearchBar';
import JoinQueue from './Component/customerSide/JoinQueue/JoinQueue';
import Header from './Component/customerSide/Header'

function App() {
  return (
    <div>
      <Header/>
      <SearchBar/>
      <JoinQueue/>
    </div>

    
  );
}

export default App;
