import React, { Component, Fragment } from 'react'
import { Router } from 'react-router-dom'
import './style/App.css'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'

import Nav from './components/Nav'
import history from './history'
import Routes from './components/Routes'

const styles = theme => createStyles({
    container: {
        backgroundImage: "url('https://bit.ly/2Ukac80')",
        backgroundSize: 'cover',
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
})

class App extends Component {

    componentDidMount() {
        this.setState({
            token: localStorage.getItem('app-token'),
        })
    }

    renderStyle = () => {
        if (this.props.token && this.props.drawerOpen) {
            return { padding: '60px 0 0 225px' }
        } else if (this.props.token) {
            return { paddingTop: 60 }
        } else {
            return null
        }
    }

    render() {
        const {classes} = this.props
        return (
            <Router history={history}>
                <Fragment>
                    <Nav />
                    <div style={this.renderStyle()} className={classes.container}>
                        <Routes />
                    </div>
                </Fragment>
            </Router>
        )
    }
}
const mapStateToProps = state => ({
    drawerOpen: state.design.drawerOpen,
    token: state.user.token
})

export default connect(mapStateToProps)(withStyles(styles)(App))
