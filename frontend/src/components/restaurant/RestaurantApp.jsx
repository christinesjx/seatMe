import React, {Component} from 'react'
import ReactDOM from 'react-dom';


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from '../restaurant/AuthenticatedRoute.jsx'
import LoginComponent from '../restaurant/LoginComponent.jsx'

import HeaderComponent from '../restaurant/HeaderComponent.jsx'
import FooterComponent from '../restaurant/FooterComponent.jsx'
import ErrorComponent from '../restaurant/ErrorComponent.jsx'
import LogoutComponent from '../restaurant/LogoutComponent.jsx'
import RegisterComponent from './RegisterComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TableList from './TableList.jsx'
import ReservationList from './ReservationList'
import QueueList from './QueueList'
import RestaurantRegistration from './RestaurantRegistrationComponent.js'


class RestaurantApp extends Component {
    state = {  }
    render() { 
        return (  <div>
            <div className="RestaurantApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/business" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/register" component={RegisterComponent}/>
                    
                            <AuthenticatedRoute path="/restaurantRegister/:name" component = {RestaurantRegistration}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/tables" component={TableList}/>
                            <AuthenticatedRoute path="/reservation" component={ReservationList}/>
                            <AuthenticatedRoute path="/queue" component={QueueList}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
            


        </div>);
    }
}
 
export default RestaurantApp;