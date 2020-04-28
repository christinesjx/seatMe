import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';
import { Button, FormGroup, FormControl } from "react-bootstrap";

class RegisterComponent extends Component {

    constructor(){
        super();

        this.state = {
            username: "",
            password: "",
            success: null,
            message: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event)
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({ [name]: value });
    
        return true;
    }


    handleSubmit(event)
    {
        AuthenticationService
            .registerNewUser(this.state.username, this.state.password)
            .then((response) => {
                console.log(response.data)
                if(typeof(response.data) === 'string'){
                    this.setState({success: true})
                }else{
                    this.setState({success: false})
                    this.setState({message: "Email is already existed / password length must greater than 6"})
                }
            }).catch((e) => {
                this.setState({success: false})
                this.setState({message: "wrong"})
            })

        event.preventDefault();
    }
  

    render() { 
        console.log("register page")

        return ( 
            <div>
                <h1>Registration</h1>
                <p>
                    Please fill in all the required fields to create a new user account.
                </p>
                {this.state.success === false &&
                <p className="alert alert-danger" role="alert">
                    {this.state.message}
                </p>}
                {this.state.success === true &&
                <p className="alert alert-success" role="alert">
                    User successfully registered
                </p>}
                {!this.state.success &&
                <div className="Form">
                    <form onSubmit={this.handleSubmit}>

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
                        <Button block type="submit" className="btn btn-primary">Submit</Button>
                    </form>
                </div>}
            
            <Link to="/login" className="btn btn-link">Cancel</Link>
            </div>
        );
        
    }
}
 
export default RegisterComponent;