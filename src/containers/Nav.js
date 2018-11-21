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

                { token ?
                    <Link to="/logout" style={ styles }>Logout</Link>
                    :
                    <div>
                        <Link to="/login" style={ styles }>Login</Link>
                        <Link to="/signup" style={ styles }>Sign Up</Link>
                    </div>
                }

                { token ?
                    <div>
                        <Link to="/profile" style={ styles }>Profile</Link>
                        <Link to="/create-log" style={ styles }>New Log</Link>

                    </div>
                    : <Redirect to='/'/>
                }

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { token: state.user.token }
}

export default connect(mapStateToProps, null)(Nav)
