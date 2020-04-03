import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import LoginComponent from "./components/restaurant/LoginComponent.jsx";
import RestaurantApp from './components/restaurant/RestaurantApp';
import CustomerSide from './components/customer/customerSide/CustomerSide'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Link } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
class App extends Component {
  render() {
    return (

      <div className = "App">
        {/* <Router>
          <div>
              <Switch>
                  <Route path = '/' exact component = {WelcomePage}/>
                  <Route path="/business"  component={RestaurantApp}/>
                  <Route path="/customer"  component={CustomerSide}/>
              </Switch>
            </div>
        </Router> */}

        <RestaurantApp />


       </div>
    );
  }
}


export default App;