import React, {useState} from 'react'
import Input from '../../UI/Input/Input'
import './JoinQueue.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import {Link, withRouter} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import Axios from 'axios'
import {connect} from 'react-redux'




const JoinQueue = (props) => { 
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
        },
        email:{
            elementType: 'input',
            elementConfig:{
                type: 'email',
                placeholder: 'Your Email Address'
            },
            value: ''
        },
        partySize: {
            elementType: 'input',
            elementConfig:{
                type: 'text',
                placeholder: 'Your Party Size'
            },
            value: ''
        }
    });
    const [estimateWaitingTime, setEstimateWaitingTime] = useState('0');

    //Modal
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    
    const toggle = () => setModal(!modal);
    const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
    }
    const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
    }
    const {
    buttonLabel,
    className
    } = props;
      
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

    const getWaitingTimeHandler = (event) =>{
        event.preventDefault();
        const curTime = new Date();
        toggle();
        Axios.get('http://localhost:8080/reservation/waitList',{
                params:{
                    "restaurantId" : props.restaurantId,
                    "partySize" : formState['partySize'].value,
                    //need update
                    "timestamp" : curTime
                }
            })
            .then(
                (response) => {
                    const waitingTime = response.data;
                    setEstimateWaitingTime(waitingTime);
                    //toggle();
                }
            )
         
    }

    const joinQueueHandler = (event) =>{
        const signInData = {};
        for(let formElementIdentifier in formState){
            signInData[formElementIdentifier] = formState[formElementIdentifier].value;
        }
        const curTime = new Date();
        signInData["timestamp"] = curTime;
        console.log(signInData)
        
        Axios.post(`http://localhost:8080/waitList/${props.restaurantId}/add`, signInData)
        .then((response) => {
            props.history.push('/customer')
        })
    }

    const formElementsArr = [];
    for(let key in formState){
        formElementsArr.push({
            id: key,
            config: formState[key]
        });
    }
    return(
        <div className = "queueBackgroud">
        <div className = 'SignIn'>
            <p>JOIN QUEUE</p>
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
                    <Button color="success" onClick={getWaitingTimeHandler}>Get Wait Time</Button>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Join Queue</ModalHeader>
                        <ModalBody>
                            <Alert color="success">
                                 Estimated Waiting Time is : {estimateWaitingTime}
                            </Alert>
                            <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                                <ModalHeader>You've Joined Queue!</ModalHeader>
                                <ModalBody>
                                    You will receive email or phone notification 15 mins before your table is ready.
                                </ModalBody>
                                <ModalFooter>
                                <Button color="success" onClick={joinQueueHandler}>All Done</Button>
                                </ModalFooter>
                            </Modal>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="success" onClick={toggleNested}>
                            JoinQueue
                        </Button>
                        <Button color="danger">
                            <Link to = '/Customer'>GO BACK</Link>
                        </Button>
                        
                        </ModalFooter>
                    </Modal>
                </div>
            </form>
         
        </div>
        </div>
        
    )
}
const mapStateToProps = (state) => {
    return ({
        restaurantId: state.restaurantFoundId
    })
}

export default withRouter(connect(mapStateToProps)(JoinQueue))