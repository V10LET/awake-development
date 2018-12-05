import React, { Fragment, Component } from 'react'
import history from '../history'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { setToken, setUser } from '../actions/userAction'

import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const styles = theme => createStyles({
    card: {
        width: '40%'
    },
    form: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        margin: 40
    },
    textField: {
        marginTop: 5,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    birthday: {
        border: 'none',
        fontFamily: 'arial',
        fontSize: '1em',
        marginTop: 5,
    },
    birthdayLabel: {
        marginTop: 10,
        fontSize: '0.8em',
        color: 'rgba(0, 0, 0, 0.54)'
    }
})

class SignUp extends Component {

    state = {
        name: '',
        email: '',
        birthday: '',
        avatar: '',
        password: '',
        confirmPassword: '',
        loginError: null
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { name, email, birthday, avatar, password, confirmPassword } = this.state

        if (password !== confirmPassword) {
            this.setState({loginError: 'password and confirmation must match'})
            return
        }

        let r = await fetch('http://localhost:3000/api/v1/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              user: {
                name: name,
                email: email,
                birthday: birthday,
                avatar: avatar,
                password: password,
                password_confirmation: confirmPassword,
              }
            })
        })

        if (!r.ok) {
            let data = await r.json()
            this.setState({ loginError: data.error})
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
        history.push('/profile')
    }

    handleInput = name => (event) => {
        const value = event.target.value
        console.log(name, value)
        this.setState({ [name]: value })
    }

    renderError = (error) => {
        if (typeof error === 'string') {
            return <div style={{color: 'red',  fontStyle: 'oblique', fontSize: '.8em'}}>{error}</div>
        } else {
            return Object.keys(error).map(e=> {
                console.log(String(e) + + error[e])
                return <div style={{color: 'red',  fontStyle: 'oblique', fontSize: '.8em'}}>{`${String(e)} ${error[e]}`}</div>
            })
        }
    }

    render () {
        const { classes } = this.props
        console.log(this.state.loginError)
        return (
            <Card className={classes.card}>
                <form onSubmit={this.handleSubmit} style={{ marginTop: 50 }} className={classes.form}>
                    <Fragment>
                        <TextField required label="Name" className={classes.textField} onChange={this.handleInput('name')} />
                        <div style={{margin: '20px 0 0', textAlign: 'left', width: '100%'}}>
                            <label className={classes.birthdayLabel}>Birthday*</label><br/>
                            <input type='date' onChange={this.handleInput('birthday')} className={classes.birthday}/><br/>
                        </div>
                        <TextField required label="Email" className={classes.textField} onChange={this.handleInput('email')} />
                        <TextField label="Profile Picture" className={classes.textField} onChange={this.handleInput('avatar')}  helperText="Input any valid image link."/>
                        <TextField required label="Password" className={classes.textField} onChange={this.handleInput('password')} />
                        <TextField required label="Confirm Password" className={classes.textField} onChange={this.handleInput('confirmPassword')} />
                        <Button type='submit' style={{marginTop: 20}}>Sign Up</Button>
                        {this.state.loginError && this.renderError(this.state.loginError)}
                    </Fragment>
                </form>
            </Card>

        )
    }
}

const mapStateToProps = state => {
    return { token: state.user.token }
}

const mapDispatchToProps = {
    setToken,
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp))
