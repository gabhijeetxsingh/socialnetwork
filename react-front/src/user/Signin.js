import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {signin, authenticate}  from '../auth';

class Signin extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" });
        this.setState({
            [name]: event.target.value
        })
    }

    clickSubmit = event => {
        event.preventDefault();

        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = {
            email,
            password
        }

        signin(user)
            .then(data => {
                console.log(data)
                if (data.error) {
                    this.setState({ error: data.error, loading: false })
                } else {
                    //authenticate
                    //redirect
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true })
                    })
                }
            });
    }

    signinForm = (email, password) => (
        <form>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input onChange={this.handleChange("email")} type="text" className="form-control" value={email}/>
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input onChange={this.handleChange("password")} type="text" className="form-control" value={password}/>
			</div>
			<button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
				Submit
			</button>
		</form>
    );


    render() {

            let { email, password, error, redirectToReferer, loading } = this.state;

            if (redirectToReferer) {
                return <Redirect to ="/" />
            }

            return (
                    <div className="container">
				<h2 className="mt-5 mb-5">Signin</h2>
				<div className="alert alert-danger" style={{display : error ? "" : "none" }}>{error}</div>
				{loading ? (
					<div className="jumbotron text-center">
						<h2>Loading...</h2>
					</div>
					) : (
					""
					)}

				{this.signinForm(email, password)}
			</div>
        )
    }
}

export default Signin