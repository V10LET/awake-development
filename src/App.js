import React, { Component, Fragment } from 'react'
import { Router } from 'react-router-dom'
import './style/App.css'
import { connect } from 'react-redux'

import Nav from './containers/Nav'
import history from './history'
import Routes from './containers/Routes'

class App extends Component {

    componentDidMount() {
        this.setState({
            token: localStorage.getItem('app-token'),
        })
    }

    render() {
        return (
            <Router history={history}>
                <Fragment>
                    <Nav />
                    <div style={ this.props.drawerOpen ? {marginLeft: 200} : null }>
                        <Routes />
                    </div>

                </Fragment>
            </Router>
        )
    }
}
const mapStateToProps = state => {
    return {
        drawerOpen: state.design.drawerOpen
    }
}

export default connect(mapStateToProps)(App)
