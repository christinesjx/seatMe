# SeatMe

## Tutorials: 
[ReactJS + Spring Boot](https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot#add-a-jpa-domain-model)

[ReactJS + Spring cloud](https://spring.io/guides/tutorials/react-and-spring-data-rest)

[JWT token](https://jwt.io/)

[Sample project on github](https://github.com/sqshq/piggymetrics)

## RESTful apis

This project will be developed based on the following apis: 

### Enterprise side: 

* register a new restaurant: POST ../resturants/registration 
  ```json
  from frontend:
  {
  "email": "jxsun95@bu.edu",
  "password": "123456"
  }
  ```

* register a new restaurant: POST ../resturants/info 
  ```json
  from frontend:
  {
  "email":"jxsun95@bu.edu",
  "name": "BU resturant",
  "address": "1 commonwealth ave",
  "zipcode": 02215,
  "phone": 123456,
  "cuisine_type": "chinese",
  "photo": "url"
  }
  ```

* restaurant login: POST ../resturants/basicauth 

  ```json
  from frontend:
  {
  "email": "jxsun95@bu.edu",
  "password": 123456
  }
  ```

  * successful login -> get a JWT token

    ```json
    from backend:
    JWT token from the seatMe backend: 
    eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcmVzZW50YXRpb25AYnUuZWR1IiwiZXhwIjoxNTg1ODYxNTA1LCJpYXQiOjE1ODUyNTY3MDV9.OTZPiuSXSImhNqDa05WNn7ljARPRetkEavKycNkbxdHmjw0GWXt_pviqK9w6VEawiduULGV4K_nOuwvwiXkRxA
    
    go to website: jwt.io
    you can see the content of this token. for now, the token has user email

    ```

* delete a restaurant: DELETE ../resturants

  ```json
  from frontend: JWT token
  ```

* add a table in restaurant:   POST ../resturants/tables

  ```json
  from frontend:
  JWT token 
  +
  {
    "min_table_size": 2,
    "max_table_size": 4
  }
  ```

* remove a table in restaurant:  DELETE ../resturants/tables

  ```json
  from frontend: 
  JWT token 
  +
  {
    "table_id": 2
  }
  ```

* get a list of all tables in a restaurant: GET ../resturants/tables

  ```
  JWT token
  ```

* change the current availability of a table: POST ../resturants/tables

  ```json
  JWT token 
  +
  {
  "table_id": 2
  }
  ```

* get a list of all reservations: GET ../resturants/reservation

  ```json
  from frontend:
  JWT token
  +
  {
    "date": "mm-dd-yyyy"
  }
  ```

  ```json
  from backend:
  [
    {"reservation_id": 1,
    "firstname": "john",
    "lastname": "snow",
    "phone": "123456",
    "party_size": "5",
    "date": "mm-dd-yyyy",	
    "time": "7:15"
  },
    {"reservation_id": 2,
    "firstname": "johnny",
    "lastname": "snowy",
    "phone": "123456",
    "party_size": "3",
    "date": "mm-dd-yyyy",	
    "time": "8:15"
    }
  ]
  ```

* get the waitlist queue

  ```json
  from frontend: JWT token
  ```

  
* 

### Customer Side:

* get a list of restaurants:  GET ..reservation/restaurant/all

  ```json
  from backend:
  [
    {
      "restaurantId": "1",
  		"name": "BU resturant",
      "address": "1 commonwealth ave",
      "zipcode": "02215",
  		"phone": "12341256",
  		"cuisineType": "chinese"
    },
      {
      "restaurantId": "2",
  		"name": "ABC cafe",
      "address": "2 commonwealth ave",
      "zipcode": "02215",
  		"phone": "23452167",
  		"cuisineType": "american"
    },
      {
      "restaurantId": "3",
  		"name": "XYZ pizza",
      "address": "3 commonwealth ave",
      "zipcode": "02215",
  		"phone": "1324231",
  		"cuisineType": "indian"
    },
  ]
  ```

* get a list available timeslot of a restaurants: GET ../reservation/restaurant/timeslot

  ```json
  from frontend: 
  {
    "resturantId": "1",
    "date": "mm-dd-yyyy",
    "partySize": "3"
  }
  ```

  ```json
  from backend:
  ["1:15","1:30", "1:45"]
  ```

* add a reservation: POST ../reservation/add

  ```json
  from frontend:
  {
    "firstname": "john",
    "lastname": "snow",
    "phone": "123456",
    "partySize": "3",
    "resturantId": "1",
    "date": "mm-dd-yyyy",
    "time": "1:15"
  }
  ```

* get estimated time: GET ../reservation/waitlist

  ```json
  from frontend:
  {
    "resturantId": "1",
    "partySize": "5",
    "timestamp": "current time stamp"
  }
  ```

* add to waitlist: POST ../reservation/waitlist/add

  ```json
  from frontend:
  {
    "firstname": "john",
    "lastname": "snow",
    "phone": "123456",
    "partySize": "5",
    "resturantId": "1",
    "timestamp": "current time stamp"
  }
  ```

  
  

