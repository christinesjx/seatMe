import React from 'react'
import {Link} from 'react-router-dom'

const LandingHeader = () => {
    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
              <div><a href="" className="navbar-brand"> Test </a></div>
              <ul className="navbar-nav">
                  <li><Link className="nav-link" to="/">Home</Link></li>

              </ul>
              <ul className="navbar-nav navbar-collapse justify-content-end">
                  <li><Link exact className="nav-link" to='/Customer'>Customer</Link></li>
                  <li><Link exact className="nav-link" to='/Business'>Business</Link></li>
              </ul>
            </nav>
    </header>
    )
}
export default LandingHeader;