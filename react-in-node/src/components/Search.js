import React, { Component } from 'react';
import SearchTitle from './SearchTitle.js'
import Header from './Header.js';
import { BrowserRouter as Router, Route} from "react-router-dom";


class Search extends Component {
    render() {
        return (
            <div className="Search">
                <Router>
                    <Header />
                    <Route path="/search/title" component={SearchTitle} />
                </Router>
            </div>
        );
    }

}

export default Search;
