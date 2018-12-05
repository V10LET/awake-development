import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { setPath } from '../actions/designAction'
import Login from './Login'

const styles = theme => createStyles({
    homeContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        position: 'fixed',
        top: 0, bottom: 0, left: 0, right: 0,
        maxWidth: '100%', maxHeight: '100%',
        margin: 'auto',
        overflow: 'auto',
        backgroundImage: 'url("https://images.pexels.com/photos/1340155/pexels-photo-1340155.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
        backgroundSize: 'cover'
    },
    titleContainer:{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
    },
    loginContainer:{
        marginTop: 40,
        width: '100%'
    },
    title: {
        fontSize: '13em',
        color: '#1E1E1E',
        marginTop: 20
    },
    desc: {
        fontSize: '1em',
        color: '#1E1E1E',
        letterSpacing: '.1em',
    }
})

class Home extends Component {

    componentDidMount() {
        this.props.setPath('/')
    }

    render() {
        const { classes, token } = this.props
        return (
            <Fragment>
                { !token ?
                    <div className={classes.homeContainer}>
                        <div className={classes.titleContainer}>
                            <div className={classes.title}>awake</div>
                            <div className={classes.desc}>cultivating deeper self awareness through personal reflection</div>
                        </div>
                        <div className={classes.loginContainer}>
                            <Login/>
                        </div>
                    </div>
                    : <Redirect to='/dashboard'/>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({ token: state.user.token })

export default connect(mapStateToProps, { setPath })(withStyles(styles)(Home))
