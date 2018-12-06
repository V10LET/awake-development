import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import Logout from './Logout'
import SignUp from './SignUp'
import Profile from './user/Profile'
import CreateLog from './logs/CreateLog'
import ViewLogs from './logs/ViewLogs'
import Settings from './user/Settings'
import Charts from './charts/Charts'
import MedCharts from './charts/MedCharts'
import Timer from './timer/Timer'

const Routes = () =>
    <Fragment>
        <Route exact path='/' component={ Home } />
        <Route path='/signup' render={(props)=> <SignUp {...props} /> } />
        <Route path='/logout' component={ Logout } />
        <Route path='/dashboard' component={ Profile } />
        <Route path='/create-log' component={ CreateLog } />
        <Route path='/logs' component={ ViewLogs } />
        <Route path='/settings' component={ Settings } />
        <Route path='/log-charts' component={ Charts } />
        <Route path='/meditation-charts' component={ MedCharts } />
        <Route path='/timer' component={ Timer } />
    </Fragment>


export default Routes
