import React, { Component } from 'react'
import './auth.css'
import axios from 'axios';
import { connect } from 'react-redux'
import { getData } from './../../ducks/reducer'

class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        this.props.getData()
    }

    async register() {
        const { username, password } = this.state
        console.log('12', this.state)
        const response = await axios.post('/auth/register', { username, password })
        console.log(response)
        if(response.data.loggedIn) {
            this.props.history.push('/')
        } 
        else {
            alert('Email is already in use.')
        }
        this.setState({
            username: '',
            password: ''
        })
    }

    async login() {
        const { username, password } = this.state
        const response = await axios.post('/auth/login', { username, password })
        if(response.data.loggedIn) {
            this.props.history.push('/dashboard')
        }
        else {
            console.log("incorrect login")
        }
    }

    handleChange(name, value) {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="login-box">
                <input value={this.state.username} name="username" onChange={(e) => this.handleChange('username', e.target.value)} placeholder="email"></input>
                <input value={this.state.password} name="password" onChange={(e) => this.handleChange('password', e.target.value)} placeholder="password"></input>
                <button onClick={() => this.login()}>Login</button>
                <button onClick={() => this.register()}>Sign Up</button>
            </div>
        )
    }
}

let mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { getData })(Auth)