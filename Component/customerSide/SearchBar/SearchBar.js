import React from 'react'
import SignIn from '../SignIn/signIn'

const SearchBar = (props) =>{
    return(
        <div>
            <p>Available Resturant</p>
            <textarea placeholder = "Enter the Name of The Restaurant"></textarea>
            <ul>
                <li >Shah's Halal</li>
                <li >Chilacates Mexican Street Food</li>
                <li >Nud Pob Thai Cuisine</li>
                <li >Futago Udon</li>
            </ul>
            <button>Next</button>
        </div>
    )
}
export default SearchBar