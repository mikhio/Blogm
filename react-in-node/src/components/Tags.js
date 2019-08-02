import React, { Component } from 'react';
import Header from './Header.js';
import { ListGroup } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';


class Tags extends Component {
    state = {
        tags: [],
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/tags")
            .then(response => response.json())
            .then(tags => {
                this.setState({
                    tags: tags
                })
            })
    }

    render() {
        if (this.state.tags.length === 0) {
            return (
                <div className="Tags">
                    <Header />
                    <Spinner className="spinner" animation="border" variant="primary" />
                </div>
            )
        }

        const tags = this.state.tags

        return (
            <div className="Tags">
                <Header />
                <div className="tags-list">
                    <ListGroup>
                        {tags.map(el => <ListGroup.Item action href={"/tag/" + el}>{el}</ListGroup.Item>)}
                    </ListGroup>
                </div>
            </div>
        );
    }

}

export default Tags;
