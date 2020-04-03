import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import {BrowserRouter} from 'react-router-dom'





const CustomerSide = () => {
    return(
        <div>
            {console.log("customer side")}
                <SearchBar/>
            
        </div>
    )
}

export default CustomerSide