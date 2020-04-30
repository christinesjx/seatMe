import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import {BrowserRouter} from 'react-router-dom'


class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        console.log("header")
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="" className="navbar-brand"> Test </a></div>
    

                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/!!">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/tables">Table</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/reservation"> Reservation</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/queue"> Queue</Link></li>}

                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent