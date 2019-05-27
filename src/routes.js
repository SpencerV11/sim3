import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Auth from './components/Auth/Auth.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Form from './components/Form/Form.jsx'
import Post from './components/Post/Post.jsx'

export default (
    <Switch>
        <Route path ="/" exact component={Auth}/>
        <Route path ="/dashboard" component={Dashboard}/>
        <Route path ="/api/posts/:postid" component={Post}/>
        <Route path ="/new" exact component={Form}/>
    </Switch>
)