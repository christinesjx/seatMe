# SeatMe

## Tutorials: 
[ReactJS + Spring cloud](https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot#add-a-jpa-domain-model)

[ReactJS + Spring cloud](https://spring.io/guides/tutorials/react-and-spring-data-rest)

[JWT token](https://jwt.io/)

[Sample project on github](https://github.com/sqshq/piggymetrics)

## RESTful apis
#### Enterprise side 
* register a new restaurant: POST ../resturants/registration 
`
{
	"email": "jxsun95@bu.edu",
	"password": "123456",
	"name": "BU resturant",
	"address": "700 commonwealth ave"
}
`
* get a restaurant profile: GET ../accounts/profile?email=jxsun95@bu.edu
* delete a restaurant: DELETE ../restaurant?email=jxsun95@bu.edu
* restaurant login: POST ../auth/login
`
{
	"email": "jxsun95@bu.edu",
	"password": 123456
}
`
* forget password: PATCH ../auth/forget-password
`
{
	"email": "jxsun95@bu.edu"
}
`
#### Customer side
//TODO


## Backend
### data model
* One Restaurant can have many Customer 
* One Restaurant can have many Table


Resturant:

| Id   | restaurant_name   | address              | phone  |
| ---- |:-----------------:| --------------------:|-------:|
| 1    | BU cafe           | 700 commonwealth ave |123456  |



Customer:

| Id        | firstname | lastname  | phone  | timestamp                  | party_size |
| --------- |:---------:| ---------:|-------:| --------------------------:| ----------:|
| 1         | jiaxin    | sun       | 123456 | 2020-02-03 15:33:19.769000 |  2         |


TableAvailability:

| Id   | is_available   | table_size | restaurant_id |
| ---- |:--------------:|-----------:| -------------:|
| 1    | True           | 2          | 1             |
| 2    | False          | 2          | 1             |
| 3    | True           | 4          | 1             |

