import React, { Component } from 'react';
import Header from './Header';
var firebase = require('firebase');
var firebaseui = require('firebaseui');

class LoginContainer extends Component {
    state = { 
        email: '', 
        password: '', 
        error: '' 
    };

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };
     
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    /** 
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ error: '' });
        if (this.state.email && this.state.password) {
            // Try to log in the user
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(res => { console.log(res); })
                .catch(err => { console.log(err); })
        } else {
            // Display an error remined the user to fill out fields
        this.setState({ error: 'Please fill in both fields.' });        
        }
        console.log(this.state);
    };*/

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ error: '' });
        if (this.state.email && this.state.password) {
            this.login();
        } else {
            this.setState({ error: 'Please fill in both fields.' });
        }
    };

    login() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    this.signup();
                } else {
                    this.setState({ error: 'Error logging in.' });
                }
            });
    }
    
    signup() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: 'Error signing up.' });
        });
    }

    render() {
        return (
            <div id="LoginContainer" className="inner-container">
                <div id="Header">
                    <Header />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <p>Sign in or sign up by entering your email and password.</p>
                    <input 
                        type="text" 
                        onChange={this.handleEmailChange}
                        value={this.state.email}
                        placeholder="Email" />
                    <input 
                        type="password" 
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                        placeholder="Password" />
                    <p className="error">{this.state.error}</p>
                    <button className="red light" type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginContainer;