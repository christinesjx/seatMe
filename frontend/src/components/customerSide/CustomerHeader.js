import React from 'react';
import {Link} from 'react-router-dom'

const CustomerHeader = () => {
    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
              <div><a href="" className="navbar-brand"> SeatMe </a></div>
              <ul className="navbar-nav">
                  <li><Link className="nav-link" to="/">Home</Link></li>

              </ul>
              <ul className="navbar-nav navbar-collapse justify-content-end">
                  <li><Link className="nav-link" to='/Customer'>Search</Link></li>
              </ul>
            </nav>
    </header>
    )
    
}

export default CustomerHeader;