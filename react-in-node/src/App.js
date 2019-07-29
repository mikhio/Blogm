import React, { Component } from 'react';
import Post from './components/Post.js';
import Header from './components/Header.js';
import PostDetail from './components/PostDetail.js';
import Create from './components/Create.js';
import Edit from './components/Edit.js'
import './App.css'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            cards: [],
            files: [],
        };
    }

    componentDidMount() {
        const url = window.location.href
        const arr = url.split('/')
        const id = arr[arr.length - 1]
        if (id !== '' && id !== 'create') {
            fetch('http://localhost:5000/api/page/' +  id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ data })
                })
        } else if (id === 'create') {
            fetch('http://localhost:5000/api/pages')
                .then(response => response.json())
                .then(data => {
                    var arrfil = data.files.slice(0, 50)
                    this.setState({files: arrfil})
                })
        } else {
            fetch('http://localhost:5000/api/pages')
                .then(response => response.json())
                .then(data => {
                    var arrfil = data.files.slice(0, 50)
                    this.setState({files: arrfil})
                    for (var i in arrfil) {
                        var id = arrfil[i]
                        fetch('http://localhost:5000/api/page/' + id)
                            .then(response => response.json())
                            .then(res => {
                                this.setState({
                                    cards: this.state.cards.concat(res)
                                })
                            })
                    }
                })
        }
    }
    render() {
        const url = window.location.href
        const arr = url.split('/')

        if (window.location.href === 'http://localhost:3000/create' || window.location.href === 'http://192.168.1.162:3000/create') {
            if (this.state.files !== []) {
                return (
                    <div className='App'>
                        <Header />
                        <Create files={this.state.files} />
                    </div>
                )
            }
        } else if ( arr[arr.length-2] === 'edit') {
            return (
                <div className="App">
                    <Header />
                    <Edit />
                </div>
            )
        } else {
            if (this.state.data !== null && this.state.data.id !== 'error' && arr[arr.length-2] !== 'edit') {
                return (
                    <div className="App">
                        <Header />
                        <PostDetail data={this.state.data} />
                    </div>
                );
            } else if (this.state.data !== null && this.state.data.id === 'error') {
                return <h1 className="error">{this.state.data.text}</h1>
            } else if (this.state.data === null && this.state.data !== []) {
                if (this.state.files.length !== 0) {
                    return (
                        <div className="App">
                            <Header />
                            {this.state.cards.map(el => <Post data={el} />)}
                        </div>
                    )
                } else {
                    return (
                        <div className="App">
                            <Header />
                            <h1 className="no-posts">We haven't got posts!</h1>
                        </div>
                    )
            }   }
        }
    }

}

export default App;
