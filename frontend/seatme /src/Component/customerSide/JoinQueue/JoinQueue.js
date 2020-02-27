import React, {useState} from 'react'
import Input from '../../UI/Input/Input'
import './JoinQueue.css'

const JoinQueue = (props) => { 
    const [formState, setFormState] = useState({
        first_name :{
            elementType : 'input',
            elementConfig:{
                type: 'text',
                placeholder: 'Your First Name'
            },
            value: ''
        },
        last_name :{
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
        console.log(signInData)
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
            <form onSubmit = {submitHandler}>
                {formElementsArr.map(formElement => (
                    <Input
                        key={formElement.id}
                        elememttype = {formElement.config.elememtType}
                        elementconfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        changed = {event => inputChangedHandler(event,formElement.id)}
                        />
                ))}
                <button>Submit</button>
            </form>
         
        </div>
        
    )
}

export default JoinQueue