import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import getCookieValue from '../funcs.js';
import Header from './Header.js';


class UserInfo extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        const id = getCookieValue('id')
        fetch('http://192.168.1.162:5000/api/user/' + id)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data
                })
            })
    }

    render() {

        if (this.state.user === null) {
            return (
                <div className="UserInfo">
                    <Header />
                    <Spinner className="spinner" animation="border" variant="primary" />
                </div>
            );
        }
        return (
            <div className="UserInfo">
                <Header />
                <div className="user-info">
                    <div className="user-photo-and-btns">
                        <div className="user-photo">
                            <img className="user-photo-img" src={'http://localhost:5000/api/imgs/' + this.state.user.photo} alt="Avatar" />
                        </div>
                        <Button
                            variant="outline-primary"
                            className="user-edit"
                            href="/edit/user">
                            Edit
                        </Button>
                    </div>
                    <div className="user-info-content">
                        <h2 className="user-login">{this.state.user.login}</h2>
                        <div className="user-info-profile">
                            <div className="users-var">
                                <div>Email:</div>
                                <div>Password:</div>
                            </div>
                            <div className="users-val">
                                <div>{this.state.user.email}</div>
                                <div>{this.state.user.pass}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;
