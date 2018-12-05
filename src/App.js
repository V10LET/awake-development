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

    renderStyle = () => {
        if (this.props.token && this.props.drawerOpen) {
            return { margin: '60px 0 0 200px' }
        } else if (this.props.token) {
            return { marginTop: 60 }
        } else {
            return null
        }
    }

    render() {
        return (
            <Router history={history}>
                <Fragment>
                    <Nav />
                    <div style={this.renderStyle()}>
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

export default connect(mapStateToProps)(App)
