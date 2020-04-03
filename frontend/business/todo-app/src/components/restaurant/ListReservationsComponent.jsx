// import React, { Component } from 'react'
// import RestaurantService from '../../api/todo/RestaurantService.js'
// import AuthenticationService from '../restaurant/AuthenticationService.js'
// import moment from 'moment'

// class ListReservationsComponent extends Component {
//     constructor(props) {
//         console.log('constructor')
//         super(props)
//         this.state = {
//             reservations: [],
//             message: null
//         }
//         this.checkinClicked = this.checkinClicked.bind(this)
//         this.deleteClicked = this.deleteClicked.bind(this)
//         this.refreshReservations = this.refreshReservations.bind(this)
//     }

//     componentWillUnmount() {
//         console.log('componentWillUnmount')
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         console.log('shouldComponentUpdate')
//         console.log(nextProps)
//         console.log(nextState)
//         return true
//     }

//     componentDidMount() {
//         console.log('componentDidMount')
//         console.log(this.state)
//     }

//     refreshReservations() {
//         let username = AuthenticationService.getLoggedInUserName()
//         RestaurantService.retrieveReservations(username)
//             .then(
//                 response => {
//                     //console.log(response);
//                     this.setState({ reservations: response.data })
//                 }
//             )
//     }

//     deleteClicked(id) {
//         let username = AuthenticationService.getLoggedInUserName()
//         //console.log(id + " " + username);
//         RestaurantService.deleteReservation(username, id)
//             .then(
//                 response => {
//                     this.setState({ message: `Delete of reservation ${id} Successful` })
//                     this.refreshReservations()
//                 }
//             )
//     }


//     checkinClicked(id) {
//         console.log('checkin ' + id)
//         this.props.history.push(`/todos/${id}`)
//     }

//     render() {
//         console.log('render')
//         return (
//             <div>
//                 <h1>List Reservations</h1>
//                 {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
//                 <div className="container">
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th>First Name</th>
//                                 <th>Last Name</th>
//                                 <th>Time</th>
//                                 <th>Phone</th>
//                                 <th>Party Size</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 this.state.reservations.map(
//                                     reservation =>
//                                         <tr key={reservation.id}>
//                                             <td>{reservation.firstName}</td>
//                                             <td>{reservation.lastName}</td>
//                                             <td>{reservation.date}</td>
//                                             <td>{reservation.phone}</td>
//                                             <td>{reservation.partySize}</td>
//                                             <td><button className="btn btn-success" onClick={() => this.checkinClicked(reservation.id)}>Checkin</button></td>
//                                             <td><button className="btn btn-warning" onClick={() => this.deleteClicked(reservation.id)}>Delete</button></td>
//                                         </tr>
//                                 )
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         )
//     }
// }

// export default ListReservationsComponent