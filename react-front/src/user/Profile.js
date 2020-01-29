import React, { Component } from 'react';
import {  isAuthenticated  } from '../auth';
import {  read  } from './apiUser';
import {Redirect} from 'react-router-dom';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
        .then(data => {
            if(data.error) {
                console.log("ERROR")
                this.setState({redirectToSignin : true})
            }
            else {
                this.setState({user : data})
                console.log(data)
            }
        })
    }

    componentDidMount() {
        const {userId} = this.props.match.params;
        this.init(userId)
        console.log("user id from route params", userId)

    }

    render() {
        const redirectToSignin  = this.state.redirectToSignin;
        if(redirectToSignin) {
            return <Redirect to="/signin" />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>Hello {isAuthenticated().user.name}</p>
                <p>Email:{isAuthenticated().user.email}</p>
                <p>{`joined ${new Date(this.state.user.created).toDateString()}`}</p>
            </div>
        )
    }
}

export default Profile