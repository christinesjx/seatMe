import React from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'
import '../../font/Oswald/Oswald-VariableFont_wght.ttf'
import '../../font/Merienda/Merienda-Regular.ttf'
import '../../font/Tangerine/Tangerine-Regular.ttf'



const LandingPage = () => {


    console.log("welcome page")

    return(
        <div>
            {/* <header>
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
            </header> */}
            <div className = 'welcome'>
                <div className = 'Title'>
                    <h1 className = 'SeatMe'>SeatMe</h1>
                    <p className = 'Intro'>SeatMe is a light-weighted, web-based restaurant reservation service. Restaurant owners can register and manage restaurants through our website, and customers can search and reserve for restaurant seats.</p>


                    <div id="container">
                        <div class="button" id="button-2">
                            <div id="slide"></div>
                            <Link exact className="nav-link" to='/Customer'>Search A Restaurant</Link>
                        </div>
                        <div class="button" id="button-2">
                            <div id="slide"></div>
                            <Link exact className="nav-link" to='/Business'>Manage Your Restaurant</Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default LandingPage;