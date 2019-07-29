import React, { Component } from 'react';

class PostDetail extends Component {
    componentDidMount() {
    }

    render() {
        const data = this.props.data
        const bodyarr = data.body.split('\n')
        return (
            <div className="PostDetail">
                <div className="content-box">
                    <div className="post-title-div">
                        <h1 className="post-title">{data.title}</h1>
                    </div>
                    <div className="post-body-div">
                        {bodyarr.map(el => <p>{el}</p>)}
                    </div>
                    <br />
                    <h5>Created {data.date}</h5>
                </div>
            </div>
        )
    }
}


export default PostDetail;
