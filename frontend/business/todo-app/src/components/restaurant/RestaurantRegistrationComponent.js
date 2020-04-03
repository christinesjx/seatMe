import React, {useState} from 'react';
import Axios from 'axios'
import AuthenticationService from './AuthenticationService.js'
import { Link } from 'react-router-dom'
import restaurantService from '../../api/todo/RestaurantService'
import { Button, FormGroup, FormControl } from "react-bootstrap";


/*

name": "ABC cafe",
 "address": "700 commonwealth ave",
 "zipCode":"01234",
 "phone":"12345",
 "cuisineType": "Indian",
 "photoReferenceUrl": "a"

*/


const RestaurantRegistrationComponent = (props) => {
    
    const[restaurantInfo, setRestaurantInfo] = useState({
        name: '',
        zipCode : '',
        phone:  '' ,
        cuisineType : '',
        address: '',
        photoReferenceUrl: 'a'

    });
    

    const handleChange = (event) => {
        let updatedRestaurantInfo = {...restaurantInfo};
        updatedRestaurantInfo[event.target.name] = event.target.value;
        setRestaurantInfo(updatedRestaurantInfo);
     } 

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(restaurantInfo)

        let username = AuthenticationService.getLoggedInUserName()

        restaurantService.updateRestuarant(username, restaurantInfo)
 
        props.history.push(`/welcome/${username}`)
    }

    

    return(
        <div className="Form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Restaurant name</label>
                    <input type="text" className="form-control" placeholder="Restaurant Name" name="name" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Zipcode</label>
                    <input type="text" className="form-control" placeholder="Zipcode" name="zipCode" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" className="form-control" placeholder="Phone Number" name="phone" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Cuisine Type</label>
                    <input type="text" className="form-control" placeholder="Cuisine Type" name="cuisineType" required onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" className="form-control" placeholder="address" name="address" required onChange={handleChange} />
                </div>
   
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default RestaurantRegistrationComponent;