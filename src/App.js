import React, { Component, Fragment } from 'react'
import { Router } from 'react-router-dom'
import './style/App.css'
import { connect } from 'react-redux'

import Nav from './components/Nav'
import history from './history'
import Routes from './components/Routes'

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
                    <div style={ this.props.drawerOpen ? {margin: '80px 0 0 200px'} : {marginTop: 100} }>
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
