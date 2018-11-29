import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setToken, setUser } from '../actions/userAction'
import { setChartData } from '../actions/logAction'

class Logout extends Component {
    componentDidMount() {
        this.props.setToken(null)
        this.props.setUser({
            name: null,
            email: null,
            birthday: null,
            avatar: null,
            logs: []
        })
        this.props.setChartData(null)
        localStorage.clear()
    }

    render() {
        return <Redirect to='/login'/>
    }
}

const mapDispatchToProps = { setToken, setUser, setChartData }
export default connect(null, mapDispatchToProps)(Logout)
