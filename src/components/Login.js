import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import { withStyles, createStyles } from '@material-ui/core/styles'

import { setToken, setUser } from '../actions/userAction'
import { setChartData } from '../actions/logAction'

const styles = theme => createStyles({
    error: {
        color: 'red',
        fontStyle: 'oblique',
        fontSize: 10,
        marginTop: 10,
    }
})

class Login extends Component {

    state = {
        email: null,
        password: null,
        loginError: null,
    }

    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        let r = await fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
        })

        if (!r.ok) {
            let data = await r.json()
            this.setState({ loginError: data.message})
            return
        }

        let data = await r.json()
        localStorage.setItem("app-token", data.token)
        this.props.setToken(data.token)

        r = await fetch('http://localhost:3000/api/v1/profile', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`
            }
        })

        data = await r.json()
        this.props.setUser(data)
        this.props.setChartData(data.logs)
        history.push('/dashboard')

    }

    render() {
        const { classes } = this.props
        return (
            <form onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
                <input type='text' name='email' onChange={this.handleChange} />
                <input type='password' name='password' onChange={this.handleChange} />
                <input type='submit' value='Login'/>
                {this.state.loginError &&
                    <div className={classes.error}>{this.state.loginError.toString()}</div>
                }
            </form>
        )
    }
}

const mapStateToProps = state => {
    return { token: state.user.token }
}

const mapDispatchToProps = {
    setToken,
    setUser,
    setChartData
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))