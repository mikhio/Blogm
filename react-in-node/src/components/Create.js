import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
            title: "This is post haven't got title!",
            body: "This is post haven't got body!",
            id: null,
        };
    }

    handleChangeTit = (event) => {
        this.setState({title: event.target.value});
    }

    handleChangeBod = (event) => {
        this.setState({body: event.target.value});
    }

    getNowTime = () => {
        var months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November",
        "December"];

        var now = new Date();
        var year = now.getFullYear();
        var month = months[now.getMonth()];
        var day = now.getDate();

        var hours = now.getHours();
        var mins = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes()

        var time = hours > 11 ? (hours - 12) + ':' + mins + ' PM' : hours + ':' + mins + ' AM';
        var n = month + ' ' + day + ' at ' + time + ', ' + year;

        return n;
    }

    nextId = id => {
        if (id !== undefined) {
            var arrId = id.split('')
            var strNum = '';
            arrId.shift()
            for (var i in arrId) {
                strNum = strNum + arrId[i]
            }
            var num = Number(strNum)
            num++
            var res = 'p' + num
            return res
        } else {
            return 'p1'
        }
    }

    handleSubmit = () => {
        var lastIx = this.props.files.length - 1
        var lastId = this.props.files[lastIx]
        this.setState({
            date: this.getNowTime(),
            id: this.nextId(lastId)
        }, () => {
            fetch("http://localhost:5000/api/add",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            window.location.href = '/'
        });
    }

    render() {
        return (
            <div className="Create">
                    <Form.Control
                        type="text"
                        name="title"
                        className="tit-feild"
                        placeholder="Title"
                        onChange={this.handleChangeTit}
                    />
                    <Form.Control
                        as="textarea"
                        rows="3"
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
        )
    }
}


export default Create;
