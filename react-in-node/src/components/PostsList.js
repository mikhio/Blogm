import React, { Component } from 'react';
import Post from './Post.js';
import Header from './Header.js';
import {Pagination} from 'react-bootstrap';


class PostsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: [],
            arrData: []
        }
    }

    componentDidMount() {
        const p = window.location.search
        if (p !== '') {
            fetch('http://localhost:5000/api/pages' + p)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        cards: data
                    })
                })
            fetch('http://localhost:5000/api/pages?p=all')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        arrData: data
                    })
                })
        } else {
            fetch('http://localhost:5000/api/pages?p=1')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        cards: data
                    })
                })
            fetch('http://localhost:5000/api/pages?p=all')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        arrData: data
                    })
                })
        }
    }

    render() {
        if (this.state.cards.length === 0 || this.state.arrData.length === 0) {
            return (
                <div className="App">
                    <Header />
                    <h1 className="no-posts">We haven't got posts!</h1>
                </div>
            );
        }
        const arrBut = [];
        const act = Number(window.location.search.split('=')[1]);
        if (this.state.arrData.length > 10) {
            const countBut = Math.ceil(this.state.arrData.length / 10)
            for (var i = 1; i <= countBut; i++) {
                arrBut.push(i)
            }
        }
        return (
            <div className="PostsList">
                <Header />
                <div className="posts">
                    {this.state.cards.map(el => <Post key={el.id} data={el} />)}
                    <Pagination>
                        {arrBut.map(el => <Pagination.Item href={"/?p=" + el} active={act === el}>{el}</Pagination.Item>)}
                    </Pagination>
                </div>
            </div>
        )
    }
}





export default PostsList;
