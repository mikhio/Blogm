import React, { Component } from 'react';
import AuthoHeader from './AuthoHeader.js';
import { Button } from 'react-bootstrap';

class AuthoPage extends Component {
    render() {
        return (
            <div className="AuthoPage">
                <AuthoHeader />
                <div className="autho-content">
                    <div className="choose">What do you want:</div>
                    <div className="autho-btns">
                        <Button variant="primary" className="sign-in" href="/login">Sign in</Button>
                        <Button variant="light" className="register" href="/register">Register</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default AuthoPage;
