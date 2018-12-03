import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import SignUp from './SignUp'
import Profile from './user/Profile'
import CreateLog from './logs/CreateLog'
import ViewLogs from './logs/ViewLogs'
import Settings from './user/Settings'
import Charts from './charts/Charts'
import Timer from './timer/Timer'

const Routes = () =>
    <Fragment>
        <Route exact path='/' component={ Home } />
        <Route path='/login' component={ Login } />
        <Route path='/signup' component={ SignUp } />
        <Route path='/logout' component={ Logout } />
        <Route path='/dashboard' component={ Profile } />
        <Route path='/create-log' component={ CreateLog } />
        <Route path='/logs' component={ ViewLogs } />
        <Route path='/settings' component={ Settings } />
        <Route path='/progress' component={ Charts } />
        <Route path='/timer' component={ Timer } />
    </Fragment>


export default Routes
