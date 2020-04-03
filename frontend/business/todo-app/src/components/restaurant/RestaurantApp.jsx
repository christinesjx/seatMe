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
import RestaurantRegistration from './RestaurantRegistrationComponent.js'
import AuthenticationService from './AuthenticationService.js'

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


{/* 
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/> */}
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