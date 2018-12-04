import React, { Fragment, Component } from 'react'
import history from '../history'
import { connect } from 'react-redux'

import { setToken, setUser } from '../actions/userAction'

class SignUp extends Component {

    state = { loginError: null }

    // refs
    inputName = null
    inputEmail = null
    inputBirthday = null
    inputAvatar = null
    inputPassword = null
    inputPassConfirm = null

    handleSubmit = async (event) => {
        event.preventDefault()
        
        let r = await fetch('http://localhost:3000/api/v1/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              user: {
                name: this.inputName.value,
                email: this.inputEmail.value,
                birthday: this.inputBirthday.value,
                avatar: this.inputAvatar.value,
                password: this.inputPassword.value,
                password_confirmation: this.inputPassConfirm.value
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

    render () {
        return (

            <form onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
                <Fragment>
                    <input type='text' placeholder='name' ref={ el => this.inputName = el } /><br/>
                    <input type='text' placeholder='image link' ref={ el => this.inputAvatar = el }/><br/>
                    <input type='date' placeholder='birthday' ref={ el => this.inputBirthday = el } /><br/>
                    <input type='email' placeholder='email' ref={ el => this.inputEmail = el }/><br/>
                    <input type='password' placeholder='password' ref={ el => this.inputPassword = el }/><br/>
                    <input type='password_confirmation' placeholder='confirm password' ref={ el => this.inputPassConfirm = el }/><br/>
                    <input type='submit' value='sign up'/>
                    {this.state.loginError &&
                        <div style={{color: 'red'}}>{this.state.loginError.toString()}</div>
                    }
                </Fragment>
            </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
