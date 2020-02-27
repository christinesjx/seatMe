import React from 'react'
import './SearchSummary.css'

const SearchSummary = (props) => {
    let restaurantInfo = Object.keys(props.restaurant).map(restaurantFeature => {
                return <li>{restaurantFeature} :  {props.restaurant[restaurantFeature]}</li>
            })
        
    return (
        <div>
            {restaurantInfo}
        </div>
    )
}

export default SearchSummary;