import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Header extends Component {
    state = {
        title: '',
        posts: 0,
        tags: 0
    }

    handleChange = (event) => {
        this.setState({
            title:event.target.value
        })
    }

    handleSearch = () => {
        window.location.href = '/?q=' + this.state.title + '&p=1'
    }

    handleExit = () => {
        document.cookie = 'authoriz=on; max-age=0'
        document.cookie = 'id=0; max-age=0'
        window.location.href = '/'
    }

    searchKey = (event) => {
        console.log(event.key);
        if (event.key === 'Enter') {
            this.handleSearch();
            event.preventDefault();
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/pages?p=all')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    posts: data.length
                })
            })
        fetch("http://localhost:5000/api/tags")
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
                    tags: check.length
                })
            })
    }

    render() {
        return (
            <div className="Header">
                <Navbar className="head-nav" bg="light" variant="light">
                    <Navbar.Brand href="/">Blogm</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/create">Create post</Nav.Link>
                        <Nav.Link href="/?p=1">Posts ({this.state.posts})</Nav.Link>
                        <Nav.Link href="/tags">Tags ({this.state.tags})</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            onChange={this.handleChange}
                            onKeyPress={this.searchKey}
                         />
                        <Button
                            variant="outline-primary"
                            onClick={this.handleSearch}>
                            Search
                        </Button>
                    </Form>
                    <Button
                        variant="outline-success ml-3"
                        onClick={this.handleExit}>
                        Sign out
                    </Button>
                </Navbar>
            </div>
        )
    }
}

export default Header;
