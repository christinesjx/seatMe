import React, {useState} from 'react';
import AuthenticationService from './AuthenticationService.js'
import restaurantService from '../../api/todo/RestaurantService'


import DatePicker from "react-datepicker";


const RestaurantRegistrationComponent = (props) => {
    const [openTime, setOpenTime] = useState(new Date());
    const [closeTime, setCloseTime] = useState(new Date());
    
 
    
    const[restaurantInfo, setRestaurantInfo] = useState({
        name: '',
        zipCode : '',
        phone:  '' ,
        cuisineType : '',
        address: '',
        photoReferenceUrl: 'a',
        avgDinningTime: ''

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

        const restaurantSubmit = {
            ...restaurantInfo,
            startTime: openTime,
            endTime : closeTime}

            console.log("restaurantSubmit");
            console.log(restaurantSubmit);
        
        restaurantService.updateRestuarant(username, restaurantSubmit)
 
        props.history.push(`/welcome/${username}`)
    }

    // const openTimeSelectedHandler = (date) => {
    //     const formattedTime = convertTimeToString(date);
    //     console.log("formattedTime");
    //     console.log(formattedTime);
    //     setOpenTime(formattedTime);
    //     console.log("setOpenTime(formattedTime)")
    //     console.log(openTime)
    // }
    const openTimeSelectedHandler = (date) => {

        setOpenTime(date);
        console.log("setOpenTime(formattedTime)")
        console.log(openTime)
    }

  

    // const openTimeSelectedHandler = (date) => {
    //     setOpenTime(date);
    //     console.log(openTime)

    // }


    const closeTimeSelectedHandler = (date) => {
        const formattedTime = convertTimeToString(date);
        setCloseTime(formattedTime);
    }

    const convertTimeToString = (date) =>{
        console.log("convertTimeToString");
        console.log(date.getHours() + ':' + date.getMinutes());
        return date.getHours() + ':' + date.getMinutes();
    }


    return(
        <div className="Form">
            <form onSubmit={handleSubmit}>

                
    
                <h2>Restaurant Info</h2>
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
                    <select onChange={handleChange} name="cuisineType" >
                        <option value="Chinese">Chinese</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Italian">Italian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Greek">Greek</option>
                        <option value="French">French</option>
                        <option value="Thai">Thai</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Indian">Indian</option>
                        <option value="Mediterranean">Mediterranean</option>
                    </select>
                    {/* <input type="text" className="form-control" placeholder="Cuisine Type" name="cuisineType" required onChange={handleChange} /> */}
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" className="form-control" placeholder="address" name="address" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Open Time</label>
                    <DatePicker
                          selected={openTime}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={60}
                          timeCaption="Time"
                          dateFormat="hh:mm"
                          onChange={openTimeSelectedHandler} 
                          name="openTime"
                        />
                        
                    {/* <input type="text" className="form-control" placeholder="Start Time" name="startTime" required onChange={handleChange} /> */}
                </div>
                <div className="form-group">
                    <label>Close Time</label>
                    <DatePicker
                          selected={closeTime}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={60}
                          timeCaption="Time"
                          dateFormat="hh:mm"
                          onChange={closeTimeSelectedHandler} 
                          name="closeTime"
                        />
                                        {/* <input type="text" className="form-control" placeholder="End Time" name="endTime" required onChange={handleChange} /> */}
                </div>
                <div className="form-group">
                    <label>Average Dining Time</label>
                    <input type="text" className="form-control" placeholder="Average Dining Time" name="avgDinningTime" required onChange={handleChange} />
                </div>
                
   
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default RestaurantRegistrationComponent;