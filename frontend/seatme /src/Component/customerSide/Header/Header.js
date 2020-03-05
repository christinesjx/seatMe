import React from 'react'
import ClientBusinessDropdown from '../ClientBusinessDropdown/ClientBusinessDropdown'
import './Header.css'

const Header = () => {
    return(
        <div>
            <h2 className="header">SeatMe</h2>
            <ClientBusinessDropdown />
        </div>
    )
}

export default Header