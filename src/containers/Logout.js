import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setToken, setUser } from '../actions/userAction'

class Logout extends Component {
    componentDidMount() {
        this.props.setToken(null)
        this.props.setUser({
            user: {
                name: null,
                email: null,
                birthday: null,
                avatar: null,
                logs: []
            }
        })
    }

    render() {
        return <Redirect to='/login'/>
    }
}

const mapDispatchToProps = { setToken, setUser }

export default connect(null, mapDispatchToProps)(Logout)
