import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
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


    handleSubmit = () => {
            fetch("http://localhost:5000/api/edit",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.data)
            })
            window.location.href = '/'
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
        }

        const { title, body } = this.state.data;

        return (
            <div className="Edit">
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
                    <Button
                        variant="outline-primary"
                        type="submit"
                        onClick={this.handleSubmit}>
                        Submit
                    </Button>
            </div>
        )
    }
}


export default Edit;
