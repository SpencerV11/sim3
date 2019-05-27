import React, { Component } from 'react'
import './Dashboard.css'
import { connect } from 'react-redux'
import { getData } from './../../ducks/reducer'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            userPosts: false,
            posts: []
        }
    }

    componentDidMount() {
        this.props.getData()
        this.getPosts()
    }

    getPosts = () => {
        axios.get('/api/posts').then(res => {
            // console.log(12121, res.data)
            this.setState({
                posts: res.data
            })
        }).catch(error => console.log(error))
    }

    render() {
        let { posts } = this.state
        let map = posts.map(post => {
            return (
                <Link to={`/api/posts/${post.id}`} key={post.id} className="post-box">
                        <div>Title: {post.title}</div>
                        <div>{post.content}</div>
                        <div>{post.username}</div>
                </Link>
            )
        })
        return (
            <div className="center-posts">
                <div className="center">
                    <input placeholder="Search"></input>
                    <button>Search</button>
                    <button>Reset</button>
                    <div>
                        <div>My Posts</div>
                        <input onChange={() => this.setState({ userPosts: !this.state.userPosts })} type="checkbox"></input>
                    </div>
                </div>
                {map}
            </div>
        )
    }
}

let mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getData })(Dashboard)