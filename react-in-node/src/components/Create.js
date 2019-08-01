import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Header from './Header.js';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                date: null,
                title: "This is post hasn't got title!",
                body: "This is post hasn't got body!",
            },
            files: []
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
        const url = window.location.href
        const arr = url.split('/')
        const id = arr[arr.length - 1]
        fetch('http://localhost:5000/api/pagesId')
            .then(response => response.json())
            .then(data => {
                this.setState({files: data})
            })
    }

    render() {
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
                    />
                    <Form.Control
                        as="textarea"
                        rows="20"
                        name="body"
                        className="bod-feild"
                        placeholder="Body"
                        onChange={this.handleChangeBod}
                    />
                    <Button
                        variant="outline-primary"
                        type="submit"
                        onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}


export default Create;
