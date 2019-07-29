import React, { Component } from 'react';
import PostsList from './components/PostsList.js';
import PostDetail from './components/PostDetail.js';
import Create from './components/Create.js';
import Edit from './components/Edit.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css'


class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={PostsList} />
                <Route path="/create" component={Create} />
                <Route path="/edit/:id" component={Edit} />
                <Route path="/post/:id" component={PostDetail} />
            </Router>
        );
    }

}

export default App;
