import React, {useState, useEffect} from 'react'
import Input from '../../UI/Input/Input'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';




const ReservationForm = (props) => { 
    const [formState, setFormState] = useState({
        firstName :{
            elementType : 'input',
            elementConfig:{
                type: 'text',
                placeholder: 'Your First Name'
            },
            value: ''
        },
        lastName :{
            elementType : 'input',
            elementConfig:{
                type: 'text',
                placeholder: 'Your Last Name'
            },
            value: ''
            },
        phone: {
            elementType: 'input',
            elementConfig:{
                type: 'text',
                placeholder: 'Phone Number'
            },
            value: ''
        }
        // },
        // email:{
        //     elementType: 'input',
        //     elementConfig:{
        //         type: 'email',
        //         placeholder: 'Your Email Address'
        //     },
        //     value: ''
        // },
    });

    const[reservationInfo, setReservationInfo] = useState({});
    const [submitClicked, setSubmitClicked] = useState(false);
    const [modal, setModal] = useState(false);

    const {
        buttonLabel,
        className
      } = props;
        
    const toggle = () => setModal(!modal);
      



    const updateObject = (oldObject, updatedProperties) => {
        return {
            ...oldObject,
            ...updatedProperties
        };
    };
    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(formState[inputIdentifier], {
            value: event.target.value,
          });
          const updatedOrderForm = updateObject(formState, {
            [inputIdentifier]: updatedFormElement
          });
      
          setFormState(updatedOrderForm);

    }

    const submitHandler = (event) =>{
        event.preventDefault();
        const reservationData = {};
        for(let formElementIdentifier in formState){
            reservationData[formElementIdentifier] = formState[formElementIdentifier].value;
        }
        reservationData['partySize'] = props.selectedPartySize;
        reservationData['restaurantId'] = props.restaurantId;
        reservationData['date'] = props.selectedDate;
        reservationData['time'] = props.selectedTime;
        
        const updatedSubmitClicked = !submitClicked;
        
        setSubmitClicked(updatedSubmitClicked);
        setReservationInfo(reservationData);
        toggle();
        
        

    }

    useEffect(() =>{
        Axios.post('http://localhost:8080/reservation/add', reservationInfo)
        .then(console.log(reservationInfo))
    },[submitClicked])

    const formElementsArr = [];
    for(let key in formState){
        formElementsArr.push({
            id: key,
            config: formState[key]
        });
    }
    return(
        <div className = 'SignIn'>
            <p>Reservation Form</p>
            <form>
                {formElementsArr.map(formElement => (
                    <Input
                        key={formElement.id}
                        elememttype = {formElement.config.elememtType}
                        elementconfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        changed = {event => inputChangedHandler(event,formElement.id)}
                        />
                ))}
                <div>
                    <Button color="success" onClick={submitHandler}>Submit</Button>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Reservation</ModalHeader>
                        <ModalBody>
                            <Alert color="success">
                                 Reservation Has Been Made!
                            </Alert>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="warning">
                            <Link to = '/'>GO BACK</Link>
                        </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </form>
         
        </div>
        
    )
}

export default ReservationForm;