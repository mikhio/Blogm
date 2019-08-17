import React, { Component } from 'react';
import AuthoHeader from './AuthoHeader.js';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Register extends Component {
    state = {
        user: {
            email: '',
            login: '',
            pass1: '',
            pass2: ''
        },
        isLogin: true,
        isPass: true
    }

    handeleChangeEmail = (event) => {
        var prevUser = {...this.state.user};
        prevUser.email = event.target.value
        this.setState({
            user: prevUser
        })
    }

    handeleChangeLogin = (event) => {
        var prevUser = {...this.state.user};
        prevUser.login = event.target.value
        this.setState({
            user: prevUser
        })
    }

    handeleChangePass1 = (event) => {
        var prevUser = {...this.state.user};
        prevUser.pass1 = event.target.value
        this.setState({
            user: prevUser
        })
    }

    handeleChangePass2 = (event) => {
        var prevUser = {...this.state.user};
        prevUser.pass2 = event.target.value
        this.setState({
            user: prevUser
        })
    }

    handleSubmit = () => {
        fetch("http://192.168.1.162:5000/api/register",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        })
            .then(response => response.json())
            .then(stat => {
                if (stat.status === 200) {
                    const time = 3600 * 24 * 7
                    document.cookie = `authoriz=on; max-age=${time}`
                    document.cookie = `id=${stat.id};`
                    window.location.href = '/'
                } else {
                    if (stat.wrong ===  'pass') {
                        this.setState({
                            isPass: false,
                            isLogin: true
                        })
                    } else if (stat.wrong ===  'username') {
                        this.setState({
                            isLogin: false,
                            isPass: true
                        })
                    }
                }
            })
    }

    render() {
        var isCanRegister = false

        if (this.state.user.email !== '' && this.state.user.login !== '' && this.state.user.pass1 !== '' && this.state.user.pass2 !== '') {
            isCanRegister = true
        } else {
            isCanRegister = false
        }

        return (
            <div className="Register">
                <AuthoHeader />
                <div className="register-content">
                    <Form.Control
                        type="text"
                        name="email"
                        className="email-field"
                        placeholder="Enter email"
                        onChange={this.handeleChangeEmail}
                    />
                    <Form.Control
                        type="text"
                        name="login"
                        className="login-field"
                        placeholder="Enter username"
                        onChange={this.handeleChangeLogin}
                    />
                    <Form.Control
                        type="password"
                        name="pass1"
                        className="pass1-field"
                        placeholder="Enter password"
                        onChange={this.handeleChangePass1}
                    />
                    <Form.Control
                        type="password"
                        name="pass2"
                        className="pass2-field"
                        placeholder="Repeat password"
                        onChange={this.handeleChangePass2}
                    />
                    <div className="register-errors-and-button">
                        <Button
                            variant="outline-primary"
                            type="submit"
                            onClick={this.handleSubmit}
                            disabled={!isCanRegister}>
                            Submit
                        </Button>
                        <div className="register-errors">{ !this.state.isLogin ? "This username is already there." : null}</div>
                        <div className="register-errors">{!this.state.isPass ? "First and second password do not match" : null}</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Register;
