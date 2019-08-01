import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Header extends Component {
    state = {
        title: '',
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

    render() {
        return (
            <div className="Header">
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/">Blogm</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/create">Create post</Nav.Link>
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
