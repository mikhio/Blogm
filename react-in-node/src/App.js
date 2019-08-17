import React, { Component } from 'react';
import Main from './components/Main.js';
import PostDetail from './components/PostDetail.js';
import Create from './components/Create.js';
import EditPost from './components/EditPost.js'
import EditUser from './components/EditUser.js'
import Tags from './components/Tags.js'
import LogIn from './components/LogIn.js'
import Register from './components/Register.js'
import TagDetail from './components/TagDetail.js'
import UserInfo from './components/UserInfo.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import getCookieValue from './funcs.js';
import './App.css'


class App extends Component {
    render() {
        const cookie = getCookieValue('authoriz')
        if (cookie === 'on') {
            return (
                <Router>
                    <Route path="/" exact component={Main} />
                    <Route path="/create" component={Create} />
                    <Route path="/tags" component={Tags} />
                    <Route path="/tag/:name" component={TagDetail} />
                    <Route path="/edit/post/:id" component={EditPost} />
                    <Route path="/edit/user" component={EditUser} />
                    <Route path="/post/:id" component={PostDetail} />
                    <Route path="/user" component={UserInfo} />
                </Router>
            );
        } else {
            return (
                <Router>
                    <Route path="/" exact component={Main} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={LogIn} />
                </Router>
            );
        }
    }

}

export default App;
