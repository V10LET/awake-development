import React, { Fragment, Component } from 'react'
import history from '../history'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { setToken, setUser } from '../actions/userAction'

import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const styles = theme => createStyles({
    signUpContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        paddingTop: '8em',
        position: 'fixed',
        top: 0, bottom: 0, left: 0, right: 0,
        maxWidth: '100%', maxHeight: '100%',
        margin: 'auto',
        overflow: 'auto',
        backgroundImage: 'url("https://images.pexels.com/photos/1108118/pexels-photo-1108118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
        backgroundSize: 'cover'

    },
    card: {
        width: '25%'
    },
    form: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        margin: '20px 40px 40px'
    },
    textField: {
        marginTop: 10,
        width: '100%',
    },
    birthday: {
        border: 'none',
        fontFamily: 'arial',
        fontSize: '1em',
        textTransform: 'uppercase',
        marginTop: 10,
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
        loginError: null,
        visibility: false
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
        history.push('/dashboard')
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

    handleClickShowPassword = () => this.setState({ visibility: !this.state.visibility })

    render () {
        const { classes } = this.props
        console.log(this.props)
        return (
            <div className={classes.signUpContainer}>
                <div className={classes.card}>
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                        <h1>Sign Up</h1>
                        <Fragment>
                            <TextField required label="Name" className={classes.textField} onChange={this.handleInput('name')} />
                            <div style={{margin: '20px 0 0', textAlign: 'left', width: '100%'}}>
                                <label className={classes.birthdayLabel}>Birthday*</label><br/>
                                <input type='date' onChange={this.handleInput('birthday')} className={classes.birthday}/><br/>
                            </div>
                            <TextField label="Profile Picture" className={classes.textField} onChange={this.handleInput('avatar')}  helperText="Input any valid image link."/>
                            <TextField required label="Email" className={classes.textField} onChange={this.handleInput('email')} />
                            <FormControl className={classes.textField}>
                                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                <Input  type={this.state.visibility ? 'text' : 'password'} className={classes.textField} onChange={this.handleInput('password')}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton onClick={this.handleClickShowPassword}>
                                          {this.state.visibility ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                      </InputAdornment>
                                    } />
                            </FormControl>
                            <FormControl className={classes.textField}>
                                <InputLabel>Confirm Password</InputLabel>
                                <Input type={this.state.visibility ? 'text' : 'password'}  className={classes.textField} onChange={this.handleInput('confirmPassword')} />
                            </FormControl>
                            <Button type='submit' style={{marginTop: 20}}>Sign Up</Button>
                            {this.state.loginError && this.renderError(this.state.loginError)}
                        </Fragment>
                    </form>
                </div>
            </div>
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
