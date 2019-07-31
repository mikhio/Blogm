import React, { Component } from 'react';
import Post from './Post.js'


class SearchTitle extends Component {
    state = {
        cards: [],
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/search/title')
            .then(response => response.json())
            .then(cards => {
                this.setState({ cards })
            })
    }

    render() {
        if (this.state.cards.length !== 0) {
            return (
                <div className="SearchTitle">
                    {this.state.cards.map(el => <Post key={el._id} data={el} />)}
                </div>
            );
        } else {
            return (
                <div className="SearchTitle">
                    <h1 className="no-posts">Posts not found!</h1>
                </div>
            )
        }
    }

}

export default SearchTitle;
