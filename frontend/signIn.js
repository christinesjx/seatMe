import React from 'react'


const SignIn = (props) => {
    return(
        <div>
            <p>Please Enter Your Information</p>
            <form>
                <input type = 'textarea' placeholder = "First Name"></input>
                <p></p>
                <input type = 'textarea' placeholder = "Last Name"></input>
                <p></p>
                <input type = 'textarea' placeholder = "Phone Number"></input>
                <p></p>
                <input type = 'textarea' placeholder = "Email Address"></input>
                <p></p>
                <button>Submit</button>
            </form>
         
        </div>
        
    )
}

export default SignIn