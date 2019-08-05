import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Header from './Header.js';
import cn from 'classname';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        };
    }

    handleChangeTit = (event) => {
        var prevData = {...this.state.data};
        prevData.title = event.target.value;
        this.setState({data: prevData});
    }

    handleChangeBod = (event) => {
        var prevData = {...this.state.data};
        prevData.body = event.target.value;
        this.setState({data: prevData});
    }

    handleChangeTag = (event) => {
        const arrTags = []
        event.target.value.split(',').map(el => arrTags.push(el))
        var prevData = {...this.state.data};
        prevData.tags = arrTags;
        this.setState({data: prevData});
    }


    handleSubmit = () => {
        fetch("http://localhost:5000/api/edit",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.data)
        })
        window.location.href = '/?p=1'
    }

    componentDidMount() {
        const url = window.location.href
        const arr = url.split('/')
        const id = arr[arr.length - 1]
        fetch('http://localhost:5000/api/edit/' + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ data })

            })
    }

    render() {
        if (this.state.data === null) {
            return null;
        } else if (this.state.data.id === 'error') {
            return(
                <h1 className="error">{this.state.data.text}</h1>
            )
        }

        const { title, body, tags } = this.state.data;

        var isCanCreate = false

        if (this.state.data.body !== '' && this.state.data.title !== '' && this.state.data.tags[0] !== '') {
            isCanCreate = true
        } else {
            isCanCreate = false
        }

        return (
            <div className="Edit">
                <Header />
                <div className="edit-form">
                    <Form.Control
                        type="text"
                        name="title"
                        className="tit-feild"
                        placeholder="Title"
                        onChange={this.handleChangeTit}
                        value={title}
                    />
                    <Form.Control
                        as="textarea"
                        rows="20"
                        name="body"
                        className="bod-feild"
                        placeholder="Body"
                        onChange={this.handleChangeBod}
                        value={body}
                    />
                    <Form.Control
                        type="text"
                        name="title"
                        className="tag-feild"
                        placeholder="Tags (Enter tags through comma, for example: tag1,tag2)"
                        onChange={this.handleChangeTag}
                        value={tags}
                    />
                    <Button
                        variant="outline-primary"
                        type="submit"
                        onClick={this.handleSubmit}
                        disabled={!isCanCreate}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}


export default Edit;
