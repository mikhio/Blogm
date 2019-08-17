import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Header from './Header.js';

class EditPost extends Component {
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
        fetch("http://192.168.1.162:5000/api/edit/post",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.data)
        })
            .then(res => window.location.href = '/?p=1')
    }

    componentDidMount() {
        const url = window.location.href
        const arr = url.split('/')
        const id = arr[arr.length - 1]
        fetch('http://192.168.1.162:5000/api/page/' + id)
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

        var isCanEdit = false

        if (this.state.data.body !== '' && this.state.data.title !== '' && this.state.data.tags[0] !== '') {
            isCanEdit = true
        } else {
            isCanEdit = false
        }

        return (
            <div className="EditPost">
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
                        disabled={!isCanEdit}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}


export default EditPost;
