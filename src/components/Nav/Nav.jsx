import React, { Component } from 'react'
import './nav.css'
import { connect } from 'react-redux'
import { getData, logout } from './../../ducks/reducer'
import { Link, withRouter } from 'react-router-dom'

class Nav extends Component {

    componentDidMount() {
        this.props.getData()
    }

    logoutUser = () => {
        this.props.logout()
        this.props.getData()
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="nav-bar">
                <Link to="/"><button>Home</button></Link>
                <button>New Post</button>
                <button onClick={() => this.logoutUser()}>Logout</button>
                <h1>{this.props.user.userName}</h1>
            </div>
        )
    }
}

let mapStateToProps = (reduxState) => reduxState

export default withRouter(connect(mapStateToProps, { logout, getData })(Nav))