import React from 'react'

import JoinQueue from '../../components/customerSide/JoinQueue/JoinQueue'
import Reservation from '../../components/customerSide/Reservation/Reservation'
import ReservationForm from '../../components/customerSide/Reservation/ReservationForm'
import { Link,Route } from 'react-router-dom'
import { Button } from 'reactstrap'

const Options = (props) => {
    

    return(
        <div>
            <Button color="primary">
                <Link 
                    className = 'Linktag' 
                    to='/Customer/Options/Reservation'>Make Reservation</Link>
            </Button>{' '}
            <Button color = 'info'>
                <Link 
                    className = 'Linktag'
                    to= '/Customer/Options/JoinQueue'>Join Queue</Link>
            </Button>
        </div>
    )
}

export default Options;