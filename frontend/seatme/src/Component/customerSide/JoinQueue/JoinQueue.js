import React, {useState} from 'react'
import Input from '../../UI/Input/Input'
import './JoinQueue.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import {Link} from 'react-router-dom'



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
        party_size: {
            elementType: 'input',
            elementConfig:{
                type: 'text',
                placeholder: 'Your Party Size'
            },
            value: ''
        }
    });

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
        const signInData = {};
        for(let formElementIdentifier in formState){
            signInData[formElementIdentifier] = formState[formElementIdentifier].value;
        }
        const curTime = new Date();
        signInData["currentTime"] = curTime;
        toggle();
         
    }

    const formElementsArr = [];
    for(let key in formState){
        formElementsArr.push({
            id: key,
            config: formState[key]
        });
    }
    return(
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
                    <Button color="success" onClick={submitHandler}>Submit</Button>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Join Queue</ModalHeader>
                        <ModalBody>
                            <Alert color="success">
                                 You've Join the waitlist
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

export default JoinQueue