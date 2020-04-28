import React, { useState, useEffect } from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import {connect} from 'react-redux';

import Axios from 'axios'
import SearchSummary from '../../UI/SearchSummary/SearchSummary'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Jumbotron, Alert } from 'reactstrap';
import CustomerService from '../../../api/todo/CustomerService'

import './SearchBar.css'



const SearchBar = (props) =>{
    const [userInput, setUserInput] = useState('')
    const [isRestaurantFound, setIsRestaurantFound] = useState(false);
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantFound, setRestaurantFound] = useState({});
    const [buttonClicked, setButtonClicked] = useState(false);

    const {
        buttonLabel,
        className
      } = props;
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    
    const inputChangeHandler = (event) => {
       const updatedUserInput = event.target.value;
       setUserInput(updatedUserInput)
    }

    const searchButtonHandler = (event) => {
        event.preventDefault();

        //test
        if(isRestaurantFound == true){
            (console.log("restaurant found"))
        }
        else{
            console.log("restaurant not found")
        }

        const updatedButtonClicked = !buttonClicked;
        setButtonClicked(updatedButtonClicked);
        toggle();



    }

    useEffect(() => {
        
        Axios.get("http://localhost:8080/reservation/restaurant/all")
        .then(
            (response) => {
            const updatedRestaurantList = response.data;
            setRestaurantList(updatedRestaurantList);
            //change
            const n = updatedRestaurantList.length;

            let updatedIsRestaurantFound = false;
            let updatedRestaurantFound = {};
    
            for(let i = 0; i < n; i++){
                //console.log(updatedRestaurantList[i].name)
                if(userInput.toLowerCase() == updatedRestaurantList[i].name.toLowerCase()){
                    
                    updatedIsRestaurantFound = true;
                    updatedRestaurantFound = updatedRestaurantList[i];
                    
                    //updatedRestaurantFoundId = updatedRestaurantList[i].restaurantId;
                    props.dispatch({type:'UPDATED_RESTAURANT_ID', 
                                    value:restaurantList[i].restaurantId});
                    console.log('restaurantFoundId = ' + restaurantList[i].restaurantId);
                    console.log('In search bar ' + props.restaurantFoundId);
                    
                }
            }

            setRestaurantFound(updatedRestaurantFound)
            setIsRestaurantFound(updatedIsRestaurantFound)
        })

    },[buttonClicked])
    const searchResult = <SearchSummary 
                found = {isRestaurantFound} 
                restaurant = {restaurantFound}/>

    const errorMessage = <Alert color="danger">Restaurant NOT FOUND</Alert>
    
    const jumbotronButton = <Link className = 'Linktag' to = '/Customer/Options'>More Options</Link>
    
    return(
        <div>
            <div>
                <div>
                    <Jumbotron>
                        <h1 className="display-3">SeatMe</h1>
                        <p className="lead">Begin Your Search Below</p>
                        <hr className="my-2" />
                        <input value = {userInput} 
                            onChange ={inputChangeHandler} 
                            placeholder='Restaurant Name'>
                        </input>
                        <p></p>
                        <p className="lead">
                            <Button color="primary" 
                                onClick = {searchButtonHandler}>Search</Button>
                        </p>
                    </Jumbotron>
                </div>
            <div>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Search Result</ModalHeader>
                <ModalBody>
                    {isRestaurantFound ? searchResult : errorMessage}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        {isRestaurantFound ? jumbotronButton : 'Go Back'}
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        </div>
           
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        restaurantFoundId: state.restaurantFoundId
    })
}
export default connect(mapStateToProps)(SearchBar)