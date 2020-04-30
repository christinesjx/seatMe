import React, {useState} from 'react';
import AuthenticationService from './AuthenticationService.js'
import restaurantService from '../../api/todo/RestaurantService'


import DatePicker from "react-datepicker";



const RestaurantRegistrationComponent = (props) => {
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    
 
    
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
        const formattedOpenTime = convertTimeToString(openTime)
        const formattedCloseTime = convertTimeToString(closeTime)
        const restaurantSubmit = {
            ...restaurantInfo,
            startTime: formattedOpenTime,
            endTime : formattedCloseTime}

            console.log("restaurantSubmit");
            console.log(restaurantSubmit);
        
        restaurantService.updateRestuarant(username, restaurantSubmit)
 
        props.history.push(`/welcome/${username}`)
    }

    const openTimeSelectedHandler = (date) => {

        setOpenTime(date);
        convertTimeToString(date)
       
        
        console.log("setOpenTime(date)")
        console.log(date);
        console.log(openTime)
    }

  


    const closeTimeSelectedHandler = (date) => {
        setCloseTime(date);
        
        console.log("setCloseTime(date)")
        console.log(date);
        console.log(closeTime)
    }

    const convertTimeToString = (date) =>{
        let hour = date.getHours();
        let minutes = date.getMinutes();
        
        if(hour < 10){
            hour = '0' + hour
        }
        if(minutes < 10){
            minutes = '0' + minutes
        }

        console.log("convertTimeToString");
        console.log(hour + ':' + minutes);

        return hour + ':' + minutes;
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