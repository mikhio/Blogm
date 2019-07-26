import React, { Component } from 'react';

class PostDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: props.data,
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="PostDetail">
                <h1 className="post-title">{this.state.data.title}</h1>
                <div className="post-body-div">
                    <p className="post-body">{this.state.data.body}</p>
                </div>
                <br />
                <h5>Created {this.state.data.date}</h5>
            </div>
        )
    }
}


export default PostDetail;
