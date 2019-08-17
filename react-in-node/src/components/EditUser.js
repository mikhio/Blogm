import React, { Component } from 'react';
import getCookieValue from '../funcs.js';
import { Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Header from './Header.js';

class EditUser extends Component {
    state = {
        user: null,
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

    handleChangeLogin = (event) => {
        var prevUser = {...this.state.user}
        prevUser.login = event.target.value
        this.setState({
            user: prevUser
        }, () => {
            this.handleSave()
        })
    }

    handleChangeEmail = (event) => {
        var prevUser = {...this.state.user}
        prevUser.email = event.target.value
        this.setState({
            user: prevUser
        }, () => {
            this.handleSave()
        })
    }

    handleChangePass = (event) => {
        var prevUser = {...this.state.user}
        prevUser.pass = event.target.value
        this.setState({
            user: prevUser
        }, () => {
            this.handleSave()
        })
    }

    handleChangePhoto = (event) => {
        const photo = event.target.files[0]
        const data = new FormData()
        data.append('file', photo)

        fetch("http://192.168.1.162:5000/api/edit/photo/" + this.state.user._id,
        {
            method: "POST",
            body: data
        })
            .then(res => window.location.href = '/edit/user')
    }

    handleSave = () => {
        fetch("http://192.168.1.162:5000/api/edit/user",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
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

        console.log(this.state.user.photo);
        return (
            <div className="UserInfo">
                <Header />
                <div className="user-info">
                    <div className="user-photo-and-btns">
                        <div className="user-photo">
                            <img className="user-photo-img" src={'http://localhost:5000/api/imgs/' + this.state.user.photo} alt="Avatar" />
                        </div>
                        <input
                            type="file"
                            className="user-photo-input"
                            title="Choose a video please"
                            accept="image/png, image/jpeg"
                            onChange={this.handleChangePhoto}
                        />
                        <Button
                            variant="outline-danger"
                            className="user-exit"
                            href="/user">
                            Exit
                        </Button>
                    </div>
                    <div className="user-info-content">
                        <div className="user-login mb-2">
                            <input
                                type="text"
                                placeholder="Login"
                                value={this.state.user.login}
                                className="user-input"
                                onChange={this.handleChangeLogin}
                            />
                        </div>
                        <div className="user-info-profile">
                            <div className="users-var">
                                <label htmlFor="user-email">Email:</label>
                                <label htmlFor="user-pass">Password:</label>
                            </div>
                            <div className="users-val">
                                <input
                                    type="text"
                                    className="user-input"
                                    placeholder="Email"
                                    id="user-email"
                                    value={this.state.user.email}
                                    onChange={this.handleChangeEmail}
                                />
                                <input
                                    type="text"
                                    className="user-input"
                                    placeholder="Password"
                                    id="user-pass"
                                    value={this.state.user.pass}
                                    onChange={this.handleChangePass}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default EditUser;
