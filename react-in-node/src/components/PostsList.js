import React, { Component } from 'react';
import Post from './Post.js';
import Header from './Header.js';


class PostsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/pages')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    cards: data
                })
            })
    }

    render() {
        if (this.state.cards.length === 0) {
            return (
                <div className="App">
                    <Header />
                    <h1 className="no-posts">We haven't got posts!</h1>
                </div>
            );
        }
        return (
            <div className="PostsList">
                <Header />
                {this.state.cards.map(el => <Post key={el.id} data={el} />)}
            </div>
        )
    }
}





export default PostsList;
