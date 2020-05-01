import React, { useState, useEffect } from 'react'
import {Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns/esm';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem , Button} from 'reactstrap';
import ReservationForm from './ReservationForm'
import CustomerSerice from '../../../api/todo/CustomerService'

import './Reservation.css'




// props:restaurantId!!!;
/*response got from backend :  ["2-3","6-7", "7-8"] 
*/
const Reservation = (props) => {  
    //need update
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
        if(firstTimeRender == true){
            setFirstTimeRender(false)
        }
        else{
            console.log(props.restaurantFoundId)
            Axios.get('http://localhost:8080/reservation/restaurant/timeslot',{
                params:{
                    //CustomerSerice.getRestaurantFoundId()
                    "restaurantId" : props.restaurantFoundId,
                    "partySize" : partySize,
                    //need update
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
        console.log(date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear())
        return date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();

    }

    const inputChangedHandler = (event) => {
        const updatedPartySize = event.target.value;
        setPartySize(updatedPartySize);
        console.log(updatedPartySize);
    }
    

    

    return(
        <div className = "reservationBackgroud">
        
            <form  className = "Reservation">
                <p>Please Make Your Reservation</p>
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
                <Button
                    style={{
                        color: "white",
                        background: "black",
                        borderRadius: "0",
                    }}
                    outline
                    onClick={getTimeSlotHandler}
                    >
                    Get Time Slot
                </Button>
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
                            to= '/Customer/Options/Reservation/ReservationForm'>Next</Link>
                </Button>
            </form>
            <Route path = '/Customer/Options/Reservation/ReservationForm' 
                render = {() => <ReservationForm  selectedTime = {selectedTimeSlot}
                                                    selectedPartySize = {partySize}
                                                    selectedDate = {converDateToString(startDate)}
                                                    restaurantId = {props.restaurantFoundId}/>}/>
        </div>
    )
}

const mapStateToProps = state => ({
    restaurantFoundId : state.restaurantFoundId,
    reservationFormInfo : state.reservationFormInfo
})

export default connect(mapStateToProps)(Reservation);
  