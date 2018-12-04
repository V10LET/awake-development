import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { setUser } from '../../actions/userAction'

import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => createStyles({
    editBtn: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 10px 0',
        marginRight: '-40px',
    },
    birthday: {
        border: 'none',
        fontFamily: 'arial',
        fontSize: '1em',
        marginTop: 5,
    },
    birthdayLabel: {
        fontSize: '0.8em',
        color: 'rgba(0, 0, 0, 0.54)'
    }
})


class UserEditForm extends React.Component {

    state = {
        name: this.props.user.name,
        birthday: this.props.user.birthday,
        email: this.props.user.email,
        avatar: this.props.user.avatar,
    }

    handleChange = (name) => (event) => {
        const value = event.target.value
        console.log(name, value)
        this.setState({ [name]: value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let r = await fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.props.token}` },
            body: JSON.stringify({
                user: {
                    name: this.state.name,
                    email: this.state.email,
                    birthday: this.state.birthday,
                    avatar: this.state.avatar,
                }
            })
        })

        r = await fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.props.token}`}
        })

        let data = await r.json()
        console.log(data)
        this.props.setUser(data)
        this.props.handleClick()
    }

    render () {
        const { classes } = this.props
        const { name, birthday, email, avatar } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <Fragment>
                    <div className={classes.editBtn}>
                        <IconButton type='submit'>
                            <Tooltip title='Save My Info' placement="right">
                                <SaveIcon/>
                            </Tooltip>
                        </IconButton>
                    </div>
                    <TextField label='Name' value={name} onChange={this.handleChange('name')} margin='normal'/><br/>
                    <div style={{ marginTop: 10 }}>
                        <label className={classes.birthdayLabel}>Birthday</label><br/>
                        <input type='date' value={birthday} onChange={this.handleChange('birthday')} className={classes.birthday}/><br/>
                    </div>
                    <TextField label='Email' value={email} onChange={this.handleChange('email')} margin='normal'/><br/>
                    <TextField label='Avatar Link' value={avatar} onChange={this.handleChange('avatar')} margin='normal'/><br/>
                </Fragment>
            </form>
        )
    }
}

const mapStateToProps = state => ({ user: state.user.user })

export default connect(mapStateToProps, { setUser })(withStyles(styles)(UserEditForm))