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
        fetch("http://localhost:5000/api/search/title",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(() => {
                window.location.href = '/search/title'
            });
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
                this.setState({
                    tags: tags.length
                })
            })
    }

    render() {
        return (
            <div className="Header">
                <Navbar bg="light" variant="light">
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
                </Navbar>
            </div>
        )
    }
}

export default Header;
