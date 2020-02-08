import React, { Component } from 'react';
import {  isAuthenticated  } from '../auth';
import {  read  } from './apiUser';
import {Redirect, Link} from 'react-router-dom';
import DefaultProfile from "../images/user.png"
import DeleteUser from './DeleteUser';

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


    componentWillReceiveProps(props) {
        const {userId} = props.match.params;
        this.init(userId)

    }

    render() {
        const {redirectToSignin, user}  = this.state;
        if(redirectToSignin) {
            return <Redirect to="/signin" />
        }

        return (
            <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img className="card-img-top" src={DefaultProfile} alt={user.name} style={{width : "50%", height : "15vw", objectFit: "cover"}}/>
                    </div>
                    <div className="col-md-6">
                    <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>Email:{user.email}</p>
                            <p>{`joined ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-success mr-5"
                                to={`/user/edit/${user._id}`}>
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={user._id}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile