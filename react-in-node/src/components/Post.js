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
    fetch("http://192.168.1.162:5000/api/delete",
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
    const query = window.location.search
    window.location.href = '/' + query
}

const handleEdit = id => () => {
    window.location.href = '/edit/post/' + id
}

class Post extends Component {
    render() {
        const { data } = this.props;
        const arrlet = data.body.split('')
        let tagsStrErr = ""
        for (var i in data.tags) {
            const tag = data.tags[i]
            tagsStrErr += ' ' + tag + ','
        }
        const tagsStr = tagsStrErr.substring(1, tagsStrErr.length - 1)

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
                    <Card.Footer className="text-muted">Tags: {tagsStr}</Card.Footer>
                </Card>
            </div>
        )
    }
}





export default Post;
