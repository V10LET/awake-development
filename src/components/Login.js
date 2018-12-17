import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { setToken, setUser } from '../actions/userAction'
import { setChartData } from '../actions/logAction'
import { setPath } from '../actions/designAction'

import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const styles = theme => createStyles({
    loginContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textField: {
        width: '15%',
    },
    form: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    error: {
        color: 'red',
        fontStyle: 'oblique',
        fontSize: 10,
        marginTop: 10,
    },
    resize: {
        fontSize: 12,
        letterSpacing: 2,
    }
})

class Login extends Component {

    state = {
        email: '',
        password: '',
        loginError: null,
    }

    handleChange = name => (event) => {
        const value = event.target.value
        this.setState({ [name]: value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        let r = await fetch('/api/v1/login', {
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

        r = await fetch('/api/v1/profile', {
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
            <div className={classes.loginContainer}>
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField placeholder="Email" className={classes.textField} style={{marginRight: 20}}
                        value={this.state.email} onChange={this.handleChange('email')}
                        InputProps={{ classes: { input: classes.resize }}} />

                    <TextField type="password" placeholder="Password" className={classes.textField}
                        value={this.state.password} onChange={this.handleChange('password')}
                        InputProps={{ classes: { input: classes.resize }}} />

                    <IconButton type='submit'>
                        <ChevronRightIcon />
                    </IconButton>
                </form>
                {this.state.loginError &&
                    <div className={classes.error}>{this.state.loginError.toString()}</div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({ token: state.user.token })

const mapDispatchToProps = {
    setToken,
    setUser,
    setChartData,
    setPath
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
