const initialState = {
    restaurantFoundId : -1,
    
    reservationFormInfo : {
        selectedTime : '',
        selectedPartySize : '',
        selectedDate : '',
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'UPDATED_RESTAURANT_ID': 
        console.log('reducer activated')
        return {
            ...state,
            restaurantFoundId : action.value
        }

        default:
            return state


    }
}


export default reducer