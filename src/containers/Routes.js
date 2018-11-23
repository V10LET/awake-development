import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import SignUp from './SignUp'
import Profile from './Profile'
import Logs from './Logs'


const Routes = () =>
    <Fragment>
        <Route exact path='/' component={ Home } />
        <Route path='/login' component={ Login } />
        <Route path='/signup' component={ SignUp } />
        <Route path='/logout' component={ Logout } />
        <Route path='/profile' component={ Profile } />
        <Route path='/new-log' component={ Logs } />
    </Fragment>


export default Routes
