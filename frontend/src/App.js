import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import RestaurantApp from './components/restaurant/RestaurantApp';
import CustomerSide from './components/customerSide/CustomerSide';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import FooterComponent from './components/restaurant/FooterComponent';
import LandingPage from './components/LandingPage/LandingPage'


class App extends Component {
  render() {
    return (

      <div className = "App">
      <BrowserRouter>
          <div>
            <Route exact path = '/' component = {LandingPage}></Route>
            <Switch>
              
                <Route path="/Business">
                    <RestaurantApp/>
                </Route>
                <Route path='/Customer'>
                    <CustomerSide/>
                </Route>
            </Switch>
          </div>
     </BrowserRouter>

     <FooterComponent/>

       </div>

     

    );
  }
}


export default App;