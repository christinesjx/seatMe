import React, { useState, useEffect } from 'react'
import {Route, Link} from 'react-router-dom'

import Axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns/esm';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem , Button} from 'reactstrap';
import ReservationForm from './ReservationForm'

import './Reservation.css'




// props:restaurantId!!!;
/*response got from backend :  ["2-3","6-7", "7-8"] 
*/
const Reservation = (props) => {  
    const [startDate, setStartDate] = useState(new Date());
    const [timeSlotDropDownEntry, setTimeSlotDropDownEntry] = useState([]);
    const [getTimeSlotButton, setGetTimeSlotButton] = useState(false)
    const [firstTimeRender, setFirstTimeRender] = useState(true);
    const [reservationButton, setReservationButton] = useState(false); 
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('Available Time')   
    const [partySize, setPartySize] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false);
    

  const toggle = () => setDropdownOpen(prevState => !prevState);
    
    const getTimeSlotHandler = (event) => {
        event.preventDefault();
        let updatedGetTimeSlotButton = getTimeSlotButton;
        updatedGetTimeSlotButton = !updatedGetTimeSlotButton;
        setGetTimeSlotButton(updatedGetTimeSlotButton);
        
    }

    useEffect(() => {
        {
            console.log(props.restaurantId)
            Axios.get('http://localhost:8080/reservation/restaurant/timeslot',{
                params:{
                    "restaurantId" : props.restaurantId,
                    "partySize" : partySize,
                    "date" : converDateToString(startDate)
                }
            })
            .then((response) => {
            let updatedTimeSlotDropDownEntry = []
            const timeSlots = response.data;
            console.log(timeSlots)
            timeSlots.forEach(element => {
                updatedTimeSlotDropDownEntry.push(<DropdownItem onClick = {dropdownItemClickHandler}>{element}</DropdownItem>);
            })
            setTimeSlotDropDownEntry(updatedTimeSlotDropDownEntry);

        })
        }
        
    }, [getTimeSlotButton])

    const reservationHandler = (event) => {
        event.preventDefault();
        let updatedReservationButton = reservationButton;
        updatedReservationButton = !updatedReservationButton;
        setReservationButton(updatedReservationButton)
        console.log(selectedTimeSlot)
    }

    const dropdownItemClickHandler = (event) => {
        const updatedSelectedTimeSlot = event.currentTarget.textContent;
        setSelectedTimeSlot(updatedSelectedTimeSlot);
    }


    /*useEffect(() => {
        Axios.post('http://......', )
    })
    */

    const converDateToString = (date) =>{
        return date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();

    }

    const inputChangedHandler = (event) => {
        const updatedPartySize = event.target.value;
        setPartySize(updatedPartySize);
    }
    

    

    return(
        <div>
            <form  className = "Reservation">
                <DatePicker
                    selected = {startDate}
                    dateFormat="MM/dd/yyyy"
                    onChange = {date => setStartDate (date)}
                    minDate = {new Date()}
                    maxDate = {addDays(new Date(), 30)}
                    />
                <input type = 'text' 
                    required
                    placeholder = 'Party Size' 
                    onChange = {inputChangedHandler}></input>
                <p></p>
                <Button color = 'info' 
                    outline
                    onClick = {getTimeSlotHandler}>Get Time Slot</Button>
                <p></p>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        {selectedTimeSlot}
                    </DropdownToggle>
                    <DropdownMenu>
                        {timeSlotDropDownEntry}
                    </DropdownMenu>
                </Dropdown>
                <p></p>
                <Button color = 'info'
                    onClick = {reservationHandler}>
                        <Link 
                            className = 'Linktag' 
                            to= '/CustomerSide/Options/Reservation/ReservationForm'>Next</Link>
                </Button>
            </form>
            <Route path = '/CustomerSide/Options/Reservation/ReservationForm' 
                render = {() => <ReservationForm  selectedTime = {selectedTimeSlot}
                                                    selectedPartySize = {partySize}
                                                    selectedDate = {converDateToString(startDate)}
                                                    restaurantId = {props.restaurantId}/>}/>
        </div>
    )
}

export default Reservation;
  