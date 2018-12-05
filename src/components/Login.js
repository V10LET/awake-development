import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { setToken, setUser } from '../actions/userAction'
import { setChartData } from '../actions/logAction'
import { setPath } from '../actions/designAction'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const styles = theme => createStyles({
    loginContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0, bottom: 0, left: 0, right: 0,
        maxWidth: '100%', maxHeight: '100%',
        margin: 'auto',
        overflow: 'auto',
        backgroundImage: "url('https://images.pexels.com/photos/1404918/pexels-photo-1404918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
        // backgroundImage: 'url("https://images.pexels.com/photos/1108118/pexels-photo-1108118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
        backgroundSize: 'cover'
    },
    textField: {
        marginBottom: 20
    },
    form: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontStyle: 'oblique',
        fontSize: 10,
        marginTop: 10,
    }
})

class Login extends Component {

    state = {
        email: '',
        password: '',
        loginError: null,
    }

    componentDidMount() {
        this.props.setPath(this.props.match.path)
    }

    handleChange = name => (event) => {
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
        const { classes, match } = this.props
        return (
            <div className={classes.loginContainer}>
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <h1>Login</h1>
                    <TextField label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} />
                    <TextField type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} />
                    <Button type='submit'>Login</Button>
                    {this.state.loginError &&
                        <div className={classes.error}>{this.state.loginError.toString()}</div>
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { token: state.user.token }
}

const mapDispatchToProps = {
    setToken,
    setUser,
    setChartData,
    setPath
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
