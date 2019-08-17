import React, { Component } from 'react';
import AuthoHeader from './AuthoHeader.js';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class LogIn extends Component {
    state = {
        user: {
            email: '',
            pass: '',
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

    handeleChangePass = (event) => {
        var prevUser = {...this.state.user};
        prevUser.pass = event.target.value
        this.setState({
            user: prevUser
        })
    }

    handleSubmit = () => {
        fetch("http://192.168.1.162:5000/api/login",
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
                    } else if (stat.wrong ===  'email') {
                        this.setState({
                            isLogin: false,
                            isPass: true
                        })
                    }
                }
            })
    }

    render() {
        var isCanLogin = false

        if (this.state.user.login !== '' && this.state.user.pass !== '') {
            isCanLogin = true
        } else {
            isCanLogin = false
        }

        return (
            <div className="LogIn">
                <AuthoHeader />
                <div className="login-content">
                    <Form.Control
                        type="text"
                        name="email"
                        className="login-field"
                        placeholder="Enter email"
                        onChange={this.handeleChangeEmail}
                    />
                    <Form.Control
                        type="password"
                        name="pass"
                        className="pass2-field"
                        placeholder="Enter password"
                        onChange={this.handeleChangePass}
                    />
                    <div className="login-errors-and-button">
                        <Button
                            variant="outline-primary"
                            type="submit"
                            onClick={this.handleSubmit}
                            disabled={!isCanLogin}>
                            Submit
                        </Button>
                        <div className="login-errors">{ !this.state.isLogin ? "We don’t have that email" : null}</div>
                        <div className="login-errors">{!this.state.isPass ? "You enter wrong password" : null}</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default LogIn;
