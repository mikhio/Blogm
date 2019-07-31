import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const handleGoPage = id => () => {
    window.location.href = '/post/' + id
}

const createStr = array => {
    var res = '';
    var c = 0;
    for (var i in array) {
        res += array[i]
        c++
        if (c >= 45) {
            return res + '...'
        }
    }
}

const handleDelete = id => () => {
    const obj = {
        delete: id,
    }
    var json = JSON.stringify(obj)
    fetch("http://localhost:5000/api/delete",
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
    window.location.href = '/'
}

const handleEdit = id => () => {
    window.location.href = '/edit/' + id
}

class Post extends Component {
    render() {
        const { data } = this.props;
        const arrlet = data.body.split('')

        return (
            <div className="Posts">
                <Card className="post-card">
                    <Card.Header>{data.date}</Card.Header>
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Text>
                            { arrlet.length > 45 ? createStr(arrlet) : data.body }
                        </Card.Text>
                        <div className="post-buttons">
                            <Button variant="outline-success" onClick={handleGoPage(data._id)}>Read</Button>
                            <Button variant="outline-danger" className="delete-btn" onClick={handleDelete(data._id)}>Delete</Button>
                            <Button variant="outline-primary" className="edit-btn" onClick={handleEdit(data._id)}>Edit</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}





export default Post;
