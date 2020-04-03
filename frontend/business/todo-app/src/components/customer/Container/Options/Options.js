import React from 'react'

import JoinQueue from '../../customerSide/JoinQueue/JoinQueue'
import Reservation from '../../customerSide/Reservation/Reservation'
import ReservationForm from '../../customerSide/Reservation/ReservationForm'
import { Link,Route } from 'react-router-dom'
import { Button } from 'reactstrap'

const Options = (props) => {
    

    return(
        <div>
            <Button color="primary">
                <Link 
                    className = 'Linktag' 
                    to='/CustomerSide/Options/Reservation'>Make Reservation</Link>
            </Button>{' '}
            <Button color = 'info'>
                <Link 
                    className = 'Linktag' 
                    to= '/CustomerSide/Options/JoinQueue'>Join Queue</Link>
            </Button>
            
            <Route path = '/CustomerSide/Options/Reservation' render = {() => <Reservation  restaurantId = {props.restaurantId}/>}/>
            <Route path = '/CustomerSide/Options/JoinQueue' render = {() => <JoinQueue  restaurantId = {props.restaurantId}/>}/>
        </div>
    )
}

export default Options;