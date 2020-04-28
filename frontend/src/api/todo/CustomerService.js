import axios from 'axios'

export const RESTAURANT_ID = '-1';

class CustomerService {
    
    getAllRestaurant(){
        return axios.get("https://my-json-server.typicode.com/sunnymaqing/allRestaurant/allrestaurant");
    }

    
}





export default new CustomerService();

