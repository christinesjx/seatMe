import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Reservation from './Reservation/Reservation'
import Options from '../../Container/Options/Options'
import JoinQueue from './JoinQueue/JoinQueue'
import CustomerHeader from './CustomerHeader'





const CustomerSide = () => {

    return(
        <div>
            <CustomerHeader/>
            <Switch>
                <Route exact path = '/customer'>
                    <SearchBar/>
                </Route>
                <Route exact path = '/Customer/Options'>
                    <Options/>
                </Route>
                <Route path = '/Customer/Options/Reservation'>
                    <Reservation/>
                </Route>
                <Route path = '/Customer/Options/JoinQueue'>
                    <JoinQueue/>
                </Route>
            </Switch>
            
        </div>
    )
}

export default CustomerSide