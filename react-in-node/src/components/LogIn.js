import React, { Component } from 'react';
import AuthoHeader from './AuthoHeader.js';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class LogIn extends Component {
    state = {
        user: {
            login: '',
            pass: '',
        },
        isLogin: true,
        isPass: true
    }

    handeleChangeLogin = (event) => {
        var prevUser = {...this.state.user};
        prevUser.login = event.target.value
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
        fetch("http://localhost:5000/api/login",
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
                    document.cookie = `id=${stat.id}; max-age=${time}`
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
                        name="login"
                        className="login-field"
                        placeholder="Enter username"
                        onChange={this.handeleChangeLogin}
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
                        <div className="login-errors">{ !this.state.isLogin ? "We don’t have that username" : null}</div>
                        <div className="login-errors">{!this.state.isPass ? "You enter wrong password" : null}</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default LogIn;
