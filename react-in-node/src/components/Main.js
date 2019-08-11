import React, { Component } from 'react';
import PostsList from './PostsList.js';
import getCookieValue from '../funcs.js';
import AuthoPage from './AuthoPage.js';

class Main extends Component {
    render() {
        const authoriz = getCookieValue('authoriz')
        if (authoriz === null) {
            return (
                <div className="Main">
                    <AuthoPage />
                </div>
            );
        }
        if (authoriz === 'on') {
            return (
                <div className="Main">
                    <PostsList />
                </div>
            );
        }
    }

}

export default Main;
