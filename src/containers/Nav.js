import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const styles = {
    marginRight: 10,
}

class Nav extends Component {
    render () {
        const { token } = this.props
        return (
            <Fragment>
                <div>
                    { token ? null : <Link to="/login" style={ styles }>Login</Link> }
                    { token ? null : <Link to="/signup" style={ styles }>Sign Up</Link> }
                </div>
                <div>
                    { token ? <Link to="/profile" style={ styles }>Profile</Link> : <Redirect to='/'/> }
                    { token ? <Link to="/create-log" style={ styles }>New Log</Link> : <Redirect to='/'/> }
                    { token ? <Link to="/logout" style={ styles }>Logout</Link> : null }
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { token: state.user.token }
}

export default connect(mapStateToProps, null)(Nav)
