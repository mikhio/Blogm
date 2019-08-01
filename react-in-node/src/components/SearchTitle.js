import React, { Component } from 'react';
import Post from './Post.js'
import {Pagination} from 'react-bootstrap';


class SearchTitle extends Component {
    state = {
        cards: [],
        arrData: [],
    }

    componentDidMount() {
        const p = window.location.search
        if (p !== '') {
            fetch('http://localhost:5000/api/search/title' + p)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        cards: data
                    })
                })
            fetch('http://localhost:5000/api/search/title?p=all')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        arrData: data
                    })
                })
        } else {
            fetch('http://localhost:5000/api/search/title?p=1')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        cards: data
                    })
                })
            fetch('http://localhost:5000/api/search/title?p=all')
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
                <div className="SearchTitle">
                    <h1 className="no-posts">Posts not found!</h1>
                </div>
            )
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
            <div className="SearchTitle">
                <div className="posts">
                    {this.state.cards.map(el => <Post key={el._id} data={el} />)}
                    <Pagination>
                        {arrBut.map(el => <Pagination.Item href={"/search/title/?p=" + el} active={act === el}>{el}</Pagination.Item>)}
                    </Pagination>
                </div>
            </div>
        );
    }

}

export default SearchTitle;
