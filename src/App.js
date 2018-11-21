import React, { Component, Fragment } from 'react'
import { Router } from 'react-router-dom'
import './style/App.css'

import Nav from './containers/Nav'
import history from './history'
import Routes from './containers/Routes'

export default class App extends Component {

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
                    <Routes />
                </Fragment>
            </Router>
        )
    }
}
