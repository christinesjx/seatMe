import axios from 'axios'
import { API_URL } from '../../Constants'

class RestuarantService {

    getAllTables(email) {
        //console.log('executed service')
        return axios.get(`${API_URL}/restaurants/${email}/tables`);
    }

    getAllReservations(email) {
        return axios.get(`${API_URL}/restaurants/${email}/reservation`);
    }

    getReservationsOnDate(email, date) {
        return axios.get(`${API_URL}/restaurants/${email}/reservation/${date}`);
    }

    addReservation(email, reservationInfo) {
        //console.log('executed service')
        return axios.post(`${API_URL}/restaurants/${email}/reservation`, reservationInfo);
    }

    deleteQueue(email, id){
        return axios.delete(`${API_URL}/restaurants/${email}/queue/${id}`)
    }

    deleteReservation(email, id){
        return axios.delete(`${API_URL}/restaurants/${email}/reservation/${id}`)
    }
    getQueue(email){
        return axios.get(`${API_URL}/restaurants/${email}/queue`)
    }
    joinQueue(email, partyInfo) {
        //console.log('executed service')
        return axios.post(`${API_URL}/restaurants/waitList/${email}/queue`, partyInfo);
    }

    updateRestuarant(email, restaurantInfo) {
        //console.log('executed service')
        return axios.post(`${API_URL}/restaurants/${email}/info`, restaurantInfo);
    }

    addTable(email, tableInfo) {
        //console.log('executed service')
        return axios.post(`${API_URL}/restaurants/${email}/table`, tableInfo);
    }

    deleteTable(email, id) {
        //console.log('executed service')
        return axios.delete(`${API_URL}/restaurants/${email}/table/${id}`);
    }

    updateTable(email, tableInfo) {
        //console.log('executed service')
        return axios.post(`${API_URL}/restaurants/${email}/table/update`, tableInfo);
    }
    
    updateTableAvailability(email, id){
        return axios.post(`${API_URL}/restaurants/${email}/table/${id}`);
    }

    checkRestaurantExist(email){
        return axios.get(`${API_URL}/restaurants/${email}`)
    }

    // retrieveReservations(id) {
    //     //console.log('executed service')
    //     return axios.get(`${API_URL}/restaurants/reservations/all`, id);
    // }

    // deleteReservations(id) {
    //     //console.log('executed service')
    //     return axios.get(`${API_URL}/restaurants/reservations/all`, id);
    // }

    // checkinReservations(id) {
    //     //console.log('executed service')
    //     return axios.get(`${API_URL}/restaurants/reservations/all`, id);
    // }
}

export default new RestuarantService()