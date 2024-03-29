import React, { Component } from 'react';
import Header from './Header.js';
import { ListGroup } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';


class Tags extends Component {
    state = {
        tags: null,
    }

    componentDidMount() {
        fetch("http://192.168.1.162:5000/api/tags")
            .then(response => response.json())
            .then(tags => {
                const check = []
                for (var i in tags) {
                    var dataTags = tags[i]
                    for (var b in dataTags) {
                        var tag = dataTags[b]
                        var flag = false
                        for (var a in check) {
                            var checkTag = check[a]
                            if (tag === checkTag) {
                                flag = true
                            }
                        }
                        if (!flag) {
                            check.push(tag)
                        }
                    }
                }
                this.setState({
                    tags: check
                })
            })
    }

    render() {
        if (this.state.tags === null) {
            return (
                <div className="Tags">
                    <Header />
                    <Spinner className="spinner" animation="border" variant="primary" />
                </div>
            )
        }

        if (this.state.tags.length === 0) {
            return (
                <div className="Tags">
                    <Header />
                    <h1 className="no-posts">We haven't got tags!</h1>
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
