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
            <div className = 'welcome'>
                <div className = 'Title'>
                <div className="SeatMeTitle"></div>
                    
                    <div className="container_LandingPage">
                    
                        <Link
                            exact
                            className = "Button" 
                            to='/Customer'>
                            Search A Restaurant
                        </Link>                 
                    {' '}
                    <Link
                        exact
                        className = "Button" 
                        to='/Business'>
                            Manage Your Restaurant
                    </Link>

            </div>
                </div>
                
            </div>
        </div>
    )
}

export default LandingPage;