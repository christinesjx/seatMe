import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js'
import restaurantService from '../../api/todo/RestaurantService'

import { Button, FormGroup, FormControl } from "react-bootstrap";

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        //console.log(this.state);
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }


    loginClicked() {

        console.log("loginClicked")
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)

                console.log(restaurantService.checkRestaurantExist(this.state.username))
                //check if restaurant exist
                restaurantService.checkRestaurantExist(this.state.username)
                .then((response) => {
                    this.props.history.push(`/welcome/${this.state.username}`)
                }).catch(() => {this.props.history.push(`/restaurantRegister/${this.state.username}`)
            })
                
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        console.log("login page")
        return (
            <div>
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                
                <h2>Login</h2>
                <div className="Form">
                    <form>
                        <FormGroup controlId="username" bsSize="large">
                        Email
                        <FormControl
                            autoFocus
                            type="email"
                            name = "username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                        Password
                        <FormControl
                            value={this.state.password}
                            name = "password"

                            onChange={this.handleChange}
                            type="password"
                        />
                        </FormGroup>
                    
                        <Button block onClick={this.loginClicked}>Login</Button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginComponent