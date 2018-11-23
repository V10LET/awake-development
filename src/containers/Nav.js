import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// material ui
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
    link: {
        textAlign: 'center',
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
}

class Nav extends Component {
    render () {
        const { token } = this.props
        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <div style={{width: '100%', textAlign: 'right'}}>
                        { token ?
                            <Button variant="contained" color="secondary"><Link to="/logout" style={ styles.link }>Logout</Link></Button>
                            :
                            <div>
                                <Link to="/login" style={ styles.link }>Login</Link>
                                <Button size='small' style={{backgroundColor: '#8b6b61'}}><Link to="/signup" style={ styles.link }>Sign Up</Link></Button>
                            </div>
                        }
                        </div>
                    </Toolbar>

                </AppBar>

                { token ?
                    <div>
                        <Link to="/profile" style={ styles }>Profile</Link>
                        <Link to="/new-log" style={ styles }>New Log</Link>

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
