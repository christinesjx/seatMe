import React from 'react';
import './App.css';

import SearchBar from './Component/customerSide/SearchBar/SearchBar';
import {BrowserRouter} from 'react-router-dom'
import CustomerSide from './Component/customerSide/CustomerSide';



function App() {
  return (
    <div>
      <BrowserRouter>
        <CustomerSide/>
     </BrowserRouter>
      

    </div>

    
  );
}

export default App;
