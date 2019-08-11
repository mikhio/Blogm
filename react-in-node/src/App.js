import React, { Component } from 'react';
import Main from './components/Main.js';
import PostDetail from './components/PostDetail.js';
import Create from './components/Create.js';
import Edit from './components/Edit.js'
import Tags from './components/Tags.js'
import LogIn from './components/LogIn.js'
import Register from './components/Register.js'
import TagDetail from './components/TagDetail.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css'


class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Main} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={LogIn} />
                <Route path="/create" component={Create} />
                <Route path="/tags" component={Tags} />
                <Route path="/tag/:name" component={TagDetail} />
                <Route path="/edit/:id" component={Edit} />
                <Route path="/post/:id" component={PostDetail} />
            </Router>
        );
    }

}

export default App;
