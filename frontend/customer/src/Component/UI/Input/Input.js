import React from 'react'
import './Input.css'
const Input = (props) =>{
    let inputElement = null;
    switch(props.elementtype){
        case ('input'):
            inputElement = <input {...props.elementconfig} 
            value = {props.value}
            onChange ={props.changed}
            className = 'InputElement'/>
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elementconfig} 
            value = {props.value}
            onChange ={props.changed}
            className = 'InputElement'/>
            break;
        default: 
            inputElement = <input {...props.elementconfig} 
            value = {props.value}
            onChange ={props.changed}
            className = 'InputElement'/>
    }

    return(
        <div className = 'Input'>
            <label className= 'Label'>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input