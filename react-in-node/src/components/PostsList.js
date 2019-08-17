import React, { Component } from 'react';
import Post from './Post.js';
import Header from './Header.js';
import {Pagination} from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';


class PostsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: null,
            arrData: null
        }
    }

    componentDidMount() {
        const p = window.location.search
        if (p !== '') {
            if (p.split('=')[0] === '?q') {
                fetch('http://192.168.1.162:5000/api/pages' + p)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            cards: data
                        })
                    })
                fetch('http://192.168.1.162:5000/api/pages' + p + '&pages=all')
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            arrData: data
                        })
                    })
            } else {
                fetch('http://192.168.1.162:5000/api/pages' + p)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            cards: data
                        })
                    })
                fetch('http://192.168.1.162:5000/api/pages?p=all')
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            arrData: data
                        })
                    })
            }
        } else {
            fetch('http://192.168.1.162:5000/api/pages?p=1')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        cards: data
                    })
                })
            fetch('http://192.168.1.162:5000/api/pages?p=all')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        arrData: data
                    })
                })
        }
    }

    render() {
        if (this.state.cards === null || this.state.arrData === null) {
            return (
                <div className="PostsList">
                    <Header />
                    <Spinner className="spinner" animation="border" variant="primary" />
                </div>
            )

        } else if (this.state.cards.length === 0 || this.state.arrData.length === 0) {
            return (
                <div className="PostsList">
                    <Header />
                    <h1 className="no-posts">We haven't got posts!</h1>
                </div>
            );
        }
        const arrBut = [];
        const query = window.location.search.split('=')
        const act = Number(query[query.length - 1]);
        const isSearch = window.location.search.split('=')[0] === '?q'
        const q = window.location.search.split('=')[1]
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
                    {isSearch ? <h2 className="found-posts">Found: {this.state.cards.length} {this.state.cards.length === 1 ? 'post' : 'posts'}</h2> : null}
                    {this.state.cards.map(el => <Post key={el.id} data={el} />)}
                    <Pagination>
                        {isSearch ? arrBut.map(el => <Pagination.Item href={"/?q=" + q + "=" + el} active={act === el}>{el}</Pagination.Item>) : arrBut.map(el => <Pagination.Item href={"/?p=" + el} active={act === el}>{el}</Pagination.Item>)}
                    </Pagination>
                </div>
            </div>
        )
    }
}





export default PostsList;
