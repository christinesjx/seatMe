import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import AuthenticationService from './AuthenticationService.js'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticatedRoute extends Component {


    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }


    setupAxiosInterceptors(token) {
        console.log("setupAxiosInterceptors")
        const interceptor = axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = sessionStorage.getItem("USER_TOKEN")
                }
                return config
            }
        );
    }

    componentWillMount(){
        this.setupAxiosInterceptors();
    }
    
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute