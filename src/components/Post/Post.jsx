import React, { Component } from 'react'
import axios from 'axios'

class Post extends Component {
    constructor() {
        super()

        this.state = {
            post: []
        }
    }

    componentDidMount() {
        this.getPostById()
    }

    getPostById() {
        axios.get(`/api/posts/${this.props.match.params.postid}`).then(res => {
            // console.log(111, res.data[0])
            this.setState({
                post: res.data[0]
            })
        })
    }
    render() {
        const { id, title, content } = this.state.post
        return (
            <div>
                <div>{id}</div>
                <div>{title}</div>
                <div>{content}</div>                
            </div>
        )
    }
}

export default Post