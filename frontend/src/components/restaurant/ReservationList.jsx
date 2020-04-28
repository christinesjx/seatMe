import React,{useEffect, useState} from 'react'
import RestaurantService from '../../api/todo/RestaurantService'
import AuthenticationService from '../restaurant/AuthenticationService.js'
import { Button,Modal, ModalHeader, ModalBody, ModalFooter,Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns/esm';
import {connect} from 'react-redux';
import Axios from 'axios';



const ReservationList = (props) =>{
    const [startDate, setStartDate] = useState(new Date());
    const[reservations, setReservations] = useState([]);
    const[message, setMessage] = useState(null);
    const[modal, setModal] = useState(false);
    const[reservationInfo, setReservationInfo] = useState({
        firstName : '',
        lastName : '',
        phone : '',
        partySize: '',
    })

    const[selectedDate, setSelectedDate] = useState('mm-dd-yyyy');
    const[selectedTime, setSelectedTime] = useState('time');

    const [timeSlotDropDownEntry, setTimeSlotDropDownEntry] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('Available Time') 

    const {
        buttonLabel,
        className
      } = props;

    const toggle = () => setModal(!modal);
    const toggleDropDown = () => setDropdownOpen(prevState => !prevState);

    const refreshReservations = () => {
        let username = AuthenticationService.getLoggedInUserName()

        console.log(username);
        const todayDate = new Date();

        
        RestaurantService.getReservationsOnDate(username, converDateToString(todayDate))
        .then(
            response => {
                console.log(username);
                const updatedReservations= response.data;
                console.log(response.data);
                setReservations(updatedReservations);
                console.log(updatedReservations);

            }
        )
    }
    const converDateToString = (date) =>{
        return date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();

    }


    useEffect(() =>{
        refreshReservations();
    },[])

    const addChangeHandler = (event) =>{
        const updatedReservationInfo = {...reservationInfo}
        updatedReservationInfo[event.target.name] = event.target.value;
        setReservationInfo(updatedReservationInfo);
        console.log(reservationInfo);
    }

    const AddButtonHandler = (event) =>{
        toggle();

        const newObject = {
            ...reservationInfo,
            date: selectedDate,
            time: selectedTime
        }

        let username = AuthenticationService.getLoggedInUserName()
        console.log("newObject")
        console.log(newObject)
        RestaurantService.addReservation(username, newObject)
        .then(response => {
            refreshReservations()
        })

    }
    
    const deleteReservationClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName()
        console.log("deleteQueueClicked" + id);
        RestaurantService.deleteReservation(username, id)
        .then(
            response => {
                setMessage({ message: `Delete of reservation ${id} Successful` })
                refreshReservations()
                }
            )
    }

    // const converDateToString = (date) =>{
    //     console.log(date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear())
    //     return date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();

    // }
    
    const dropdownItemClickHandler = (event) => {
        const updatedSelectedTimeSlot = event.currentTarget.textContent;
        setSelectedTimeSlot(updatedSelectedTimeSlot);
        setSelectedTime(updatedSelectedTimeSlot);
        
        // const updatedReservationInfo = {...reservationInfo};
        // updatedReservationInfo.time = selectedTimeSlot;
        // setReservationInfo(updatedReservationInfo);
    }

    const dateSelectedHandler = (date) => {
        setStartDate (date);
        const dateFormatted = converDateToString(startDate);
        // const updatedReservationInfo = {...reservationInfo};
        // updatedReservationInfo.date = dateFormatted;
        // setReservationInfo(updatedReservationInfo);
        
        setSelectedDate(dateFormatted);

        console.log("dateSelectedHandler")
        console.log("props.restaurantId" + props.restaurantId)
        console.log("partySize" + reservationInfo['partySize'])
        console.log("date" + dateFormatted)

        let username = AuthenticationService.getLoggedInUserName()

        Axios.get('http://localhost:8080/restaurants/timeslot',{
                params:{
                    //CustomerSerice.getRestaurantFoundId()
                    "email" : username,
                    "partySize" : reservationInfo['partySize'],
                    //need update
                    "date" : dateFormatted
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


    return (
        <div>
            {console.log("reservation")}
        <h1>Reservation</h1>
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Reservations</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>PartySize</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservations.length <= 0 ? null : reservations.map(
                            (reservation, index) =>
                                <tr key={reservation.reservationId} >
                                    <td>{index + 1}</td>
                                    <td>{reservation.firstName}</td>
                                    <td>{reservation.lastName}</td>
                                    <td>{reservation.phone}</td>
                                    <td>{reservation.partySize}</td>
                                    <td>{reservation.date}</td>
                                    <td>{reservation.time}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteReservationClicked(reservation.reservationId)}>Delete</button></td>
                                </tr>
                        )

                    }
                </tbody>
            </table>
            <div className="row">
                <Button onClick = {toggle}>Add</Button>
            </div>
            
            <div>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Add Reservation</ModalHeader>
                <ModalBody>
                    <div>
                        <input type = 'text' placeholder = "First Name" name = 'firstName' onBlur={addChangeHandler}/>
                        <input type = 'text' placeholder = "Last Name"  name = 'lastName'onBlur={addChangeHandler}/>    
                    </div>
                    <div>
                        <input type = 'text' placeholder = "phone" name = 'phone' onBlur={addChangeHandler}/>
                        <input type = 'text' placeholder = "Party Size"  name = 'partySize'onBlur={addChangeHandler}/>
                    </div>  
                    <div>
                        <DatePicker
                            selected = {startDate}
                            dateFormat="MM/dd/yyyy"
                            onChange = {dateSelectedHandler}
                            minDate = {new Date()}
                            maxDate = {addDays(new Date(), 30)}
                        />
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
                            <DropdownToggle caret>
                                {selectedTimeSlot}
                            </DropdownToggle>
                            <DropdownMenu>
                                {timeSlotDropDownEntry}
                            </DropdownMenu>
                        </Dropdown>        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="Primary" onClick={AddButtonHandler}>Add</Button>
                </ModalFooter>
                </Modal>
            </div>


        </div>


        </div>
    );

}

const mapStateToProps = state => ({
    restaurantId : state.restaurantFoundId,
    
})
export default connect(mapStateToProps)(ReservationList);