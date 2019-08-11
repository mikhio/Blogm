import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class AuthoHeader extends Component {
    render() {
        return (
            <div className="AuthoHeader">
                <Navbar className="head-nav" bg="light" variant="light">
                    <Navbar.Brand href="/">Blogm</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/create" disabled>Create post</Nav.Link>
                        <Nav.Link href="/?p=1" disabled>Posts</Nav.Link>
                        <Nav.Link href="/tags" disabled>Tags</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            disabled
                         />
                        <Button
                            variant="outline-primary"
                            disabled>
                            Search
                        </Button>
                    </Form>
                </Navbar>
            </div>
        )
    }
}

export default AuthoHeader;
