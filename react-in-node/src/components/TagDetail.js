import React, { Component } from 'react';
import Header from './Header.js';
import Post from './Post.js';
import { Spinner } from 'react-bootstrap';


class TagDetail extends Component {
    state = {
        cards: null,
    }

    componentDidMount() {
        const nameTag = window.location.href.split('/')[window.location.href.split('/').length - 1]
        fetch("http://localhost:5000/api/tag/" + nameTag)
            .then(response => response.json())
            .then(cards => {
                this.setState({
                    cards: cards
                })
            })
    }

    render() {
        if (this.state.cards === null) {
            return (
                <div className="TagDetail">
                    <Header />
                    <Spinner className="spinner" animation="border" variant="primary" />
                </div>
            )
        }

        const cards = this.state.cards

        return (
            <div className="TagDetail">
                <Header />
                <div className="posts">
                    {cards.map(el => <Post key={el.id} data={el} />)}
                </div>
            </div>
        );
    }

}

export default TagDetail;
