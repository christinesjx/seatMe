# SeatMe

## Tutorials: 
[ReactJS + Spring Boot](https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot#add-a-jpa-domain-model)

[ReactJS + Spring cloud](https://spring.io/guides/tutorials/react-and-spring-data-rest)

[JWT token](https://jwt.io/)

[Sample project on github](https://github.com/sqshq/piggymetrics)

## RESTful apis

This project will be developed based on the following apis: 

In order to 

### Enterprise side: 

* register a new restaurant: POST ../resturants/registration 
  ```json
  from frontend:
  {
  "email": "jxsun95@bu.edu",
  "password": "123456",
  "name": "BU resturant",
  "address": "1 commonwealth ave",
  "zipcode": 02215,
  "phone": 123456,
  "cuisine_type": "chinese"
  }
  ```

* restaurant login: POST ../resturants/login 

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
    JWT token example:
    {
        "user_id": 1,
        "scope": [
          "server"
        ],
        "exp": 1458126622,
        "authorities": [
            "ROLE_USER"
        ],
        "jti": "e0ad1ef3-a8a5-4eef-998d-00b26bc2c53f",
    }
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
    "date": 1581638400000,  //Math.abs(2/14/2020)
  }
  ```

  ```json
  from backend:
  [
    {"reservation_id": 1,
    "firstname": "john",
    "lastname": "snow",
    "phone": 123456,
    "party_size": 5,
    "date": 1581638400000,	//Math.abs(2/14/2020)
    "time": "7-8"
  },
    {"reservation_id": 2,
    "firstname": "johnny",
    "lastname": "snowy",
    "phone": 252442,
    "party_size": 3,
    "date": 1581638400000,	//Math.abs(2/14/2020)
    "time": "8-9"
    }
  ]
  ```

* checkout a reservation (customer arrive)

  ???

### Customer Side:

* get a list of restaurants:  GET ../resturants/all

  ```json
  from backend:
  [
    {
      "restaurant_id": 1,
  		"name": "BU resturant",
      "address": "1 commonwealth ave",
      "zipcode": 02215,
  		"phone": 12341256,
  		"cuisine_type": "chinese"
    },
      {
      "restaurant_id": 2,
  		"name": "ABC cafe",
      "address": "2 commonwealth ave",
      "zipcode": 02215,
  		"phone": 23452167,
  		"cuisine_type": "american"
    },
      {
      "restaurant_id": 3,
  		"name": "XYZ pizza",
      "address": "3 commonwealth ave",
      "zipcode": 02215,
  		"phone": 1324231,
  		"cuisine_type": "indian"
    },
  ]
  ```

* get a list available timeslot of a restaurants: GET ../resturants/timeslot

  ```json
  from frontend: 
  {
    "resturant_id": 1,
    "date": 1581638400000,	//Math.abs(2/14/2020)
    "party_size": 5
  }
  ```

  ```json
  from backend:
  ["2-3","6-7", "7-8"]
  ```

* add a reservation: POST ../reservation

  ```json
  {
    "firstname": "john",
    "lastname": "snow",
    "phone": 123456,
    "party_size": 3,
    "resturant_id": 1,
    "date": 1581638400000,	//Math.abs(2/14/2020)
    "time": "7-8"
  }
  ```

* cancel a reservation:  DELETE ../reservation

  ```json
  {
    "firstname": "john",
    "lastname": "snow",
    "phone": 123456,
    "resturant_id": 1
  }
  ```

* get estimated time: GET ../estimated-time

  ```json
  {
    "resturant_id": 1,
    "party_size": 5,
    "timestamp": {{current_time}}
  }
  ```

* add to waitlist: POST ../waitlist

  ```json
  {
    "firstname": "john",
    "lastname": "snow",
    "phone": 123456,
    "party_size": 5
    "resturant_id": 1,
    "timestamp": {{current_time}}
  }
  ```

  