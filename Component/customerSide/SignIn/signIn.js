import React, {useState} from 'react'
import Input from '../../UI/Input/Input'
import './signin.css'

const SignIn = (props) => { 
    const [formState, setFormState] = useState({
        signInForm : {
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
         
        }
    });
    const inputChangedHandler = (event, targetIdentifier) => {
         
    }

    const formElementsArr = [];
    for(let key in formState.signInForm){
        formElementsArr.push({
            id: key,
            config: formState.signInForm[key]
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
                        changed = {inputChangedHandler}
                        />
                ))}
                <button>Submit</button>
            </form>
         
        </div>
        
    )
}

export default SignIn