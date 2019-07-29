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
                var arrfil = data.files.slice(0, 50)
                for (var i in arrfil) {
                    var id = arrfil[i]
                    fetch('http://localhost:5000/api/page/' + id)
                        .then(response => response.json())
                        .then(res => {
                            this.setState({
                                cards: this.state.cards.concat(res)
                            })
                        })
                }
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
