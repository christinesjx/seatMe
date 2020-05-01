import React from 'react'
import { Link,Route } from 'react-router-dom'
import { Button } from 'reactstrap'
import './Options.css'

const Options = (props) => {
    

    return(
        <div className="optionBackgroud">
            <div className="ReservationTitle"></div>
            <div className="container_reservation">
                <Link className = "Button" 
                    to='/Customer/Options/Reservation'>
                        Make Reservation
                </Link>                 
                {' '}
                <Link
                    className = "Button" 
                    to= '/Customer/Options/JoinQueue'>
                        Join Queue
                </Link>

            </div>
            
        </div>
    )
}

export default Options;