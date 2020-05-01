# SeatMe

SeatMe is a light-weighted, web-based restaurant reservation service. Restaurant owners can register and manage restaurants through our website, and customers can search and reserve for restaurant seats. 

## Demo



## Data Model

![alt text](datamodel.png "Title")


## RESTful apis

This project will be developed based on the following apis: 

### Enterprise side: 

* register a new user: POST ../resturants/registration 
  ```json
  from frontend:
  {
  "email": "jxsun95@bu.edu",
  "password": "123456"
  }
  ```

* register/update restaurant info: POST ../resturants/{email}/info
  ```json
  from frontend:
  {
  "name": "BU resturant",
  "address": "1 commonwealth ave",
  "zipcode": "02134",
  "phone": "123456",
  "cuisineType": "chinese",
  "photo": "url",
  "startTime": "11:00",
	"endTime": "18:00",
	"avgDinningTime": "30"
  }
  ```

* restaurant login: POST ../authenticate 

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

* check if user has restaurant GET ../{email}/isRestaurant
```json
from backend:
    { "true" }
```

* get all tables GET ../restaurants/{email}/tables
```json
from backend:
    {
        "id": 1,
        "version": 0,
        "createdAt": "2020-03-05T21:23:38.577+0000",
        "updatedAt": "2020-03-05T21:23:38.564+0000",
        "minSize": 2,
        "maxSize": 10,
        "availability": true
    },
    {
        "id": 2,
        "version": 0,
        "createdAt": "2020-03-05T21:23:39.387+0000",
        "updatedAt": "2020-03-05T21:23:39.387+0000",
        "minSize": 2,
        "maxSize": 10,
        "availability": true
    }
```

* add a table in restaurant:   POST ../restaurants/{email}/table

  ```json
  from frontend:
  {
    "minSize": "2",
    "maxSize": "4"
  }
  ```

* remove a table in restaurant:  DELETE ../restaurants/{email}/table/{id}


* update a table in restaurant: POST ../restaurants/{email}/table/update/{id}
```json
{
    "minSize": "2",
    "maxSize": "4"
}
```


* change the current availability of a table: POST ../restaurants/{email}/table/{id}


* add a reservation: POST ..restaurants/reservation/add

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

* get a list of all reservations: GET ../resturants/{email}/reservations

  ```json
  from frontend:
  {
    "date": "mm-dd-yyyy"
  }
  ```

  ```json
  from backend:
  [
    {
        "id": 124,
        "firstName": "a",
        "lastName": "b",
        "phone": "1234",
        "partySize": "2",
        "date": "2021-02-02T05:00:00.000+0000",
        "time": "1:15"    
  },
    {   "id": 125,
        "firstName": "c",
        "lastName": "b",
        "phone": "1234",
        "partySize": "2",
        "date": "2021-02-02T05:00:00.000+0000",
        "time": "1:15"  
    }
  ]
  ```

* get the waitlist queue: GET ../restaurants/{email}/queue

```json
[
    {
        "id": 119,
        "firstName": "christine",
        "lastName": "sun",
        "phone": "123456",
        "partySize": "10"
    }
]
```

* add to waitlist: POST ../waitList/{restaurantId}/add

  ```json
  from frontend:
  {
    "firstname": "john",
    "lastname": "snow",
    "phone": "123456",
    "partySize": "5",
    "timestamp": "current time stamp"
  }
  ```
  

* remove customer from the queue: POST ../restaurants/{email}/queue/{id}

  

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

  in minutes
  ```json
 
  from backend:
  {
    "estimatedTime": "23" 
  }
  ```
* add to waitlist: POST ../waitList/{restaurantId}/add

  ```json
  from frontend:
  {
    "firstname": "john",
    "lastname": "snow",
    "phone": "123456",
    "partySize": "5",
    "timestamp": "current time stamp"
  }
  ```
  
  
  

