import React, { useState, useEffect } from 'react'

import Axios from 'axios'
import SearchSummary from '../../UI/SearchSummary/SearchSummary'


const SearchBar = (props) =>{
    const [userInput, setUserInput] = useState('')
    const [isRestaurantFound, setIsRestaurantFound] = useState(false);
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantFound, setRestaurantFound] = useState({});
    const [buttonClicked, setButtonClicked] = useState(false)

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



    }

    useEffect(() => {
        Axios.get("https://my-json-server.typicode.com/sunnymaqing/allRestaurant/allrestaurant")
        .then((response) => {
            const updatedRestaurantList = response.data;
            setRestaurantList(updatedRestaurantList);
            //change
            const n = updatedRestaurantList.length;

            let updatedIsRestaurantFound = false;
            let updatedRestaurantFound = {};
    
            for(let i = 0; i < n; i++){
                //console.log(updatedRestaurantList[i].name)
                if(userInput == updatedRestaurantList[i].name){
                    
                    updatedIsRestaurantFound = true;
                    updatedRestaurantFound = updatedRestaurantList[i];
                }
            }

            setRestaurantFound(updatedRestaurantFound)
            setIsRestaurantFound(updatedIsRestaurantFound)
        })

    },[buttonClicked])

    return(
        <div>
            <input value = {userInput} 
                onChange ={inputChangeHandler} 
                placeholder='Restaurant Name'>
            </input>
            <button onClick = {searchButtonHandler}>Search</button>
            <SearchSummary 
                found = {isRestaurantFound} 
                restaurant = {restaurantFound}/>
        </div>
    )
}
export default SearchBar