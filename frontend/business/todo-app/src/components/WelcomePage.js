import React from 'react'
import { Link } from 'react-router-dom';



const WelcomePage = () => {


    console.log("welcome page")

    return(
      <div>
        <Link className="nav-link" to='/customer'>Customer</Link>
        <Link className="nav-link" to="/business">Business</Link>
      </div>
      
    )
}

export default WelcomePage