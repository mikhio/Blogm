import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Header from './Header.js';
import cn from 'classname';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                date: null,
                title: "",
                body: "",
                tags: [''],
            },
            files: [],
            tags: []
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

    getNowTime = () => {
        var months = ["Jan", "Feb", "Mar", "Apr", "May",
        "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
        "Dec"];

        var now = new Date();
        var year = now.getFullYear();
        var month = months[now.getMonth()];
        var day = now.getDate();

        var hours = now.getHours();
        var mins = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes()

        var time = hours > 11 ? (hours === 12 ? hours : hours - 12) + ':' + mins + ' PM' : hours + ':' + mins + ' AM';
        var n = month + ' ' + day + ' at ' + time + ', ' + year;

        return n;
    }

    handleSubmit = () => {
        var prevData = {...this.state.data};
        prevData.date = this.getNowTime();

        this.setState({
            data: prevData
        }, () => {
            fetch("http://localhost:5000/api/add",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.data)
            })
            let countPages = 1;
            this.state.files.length > 10 ? countPages = Math.ceil(this.state.files.length / 10) : countPages = 1
            window.location.href = '/?p=' + countPages
        });
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/pagesId')
            .then(response => response.json())
            .then(data => {
                this.setState({files: data})
            })
        fetch('http://localhost:5000/api/tags')
            .then(response => response.json())
            .then(tags => {
                this.setState({tags: tags})
            })
    }

    render() {
        var isCanCreate = false

        if (this.state.data.body !== '' && this.state.data.title !== '' && this.state.data.tags[0] !== '') {
            isCanCreate = true
        } else {
            isCanCreate = false
        }

        const { title, body, tags } = this.state.data;

        return (
            <div className="Create">
                <Header />
                <div className="create-form">
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


export default Create;
