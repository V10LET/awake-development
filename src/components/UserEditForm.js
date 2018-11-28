import React, { Fragment } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'

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
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('submittteddd!')
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
                    <input type='date' value={birthday} onChange={this.handleChange('birthday')} margin='normal'/><br/>
                    <TextField label='Email' value={email} onChange={this.handleChange('email')} margin='normal'/><br/>
                    <TextField label='Avatar Link' value={avatar} onChange={this.handleChange('avatar')} margin='normal'/><br/>
                </Fragment>
            </form>
        )
    }
}

export default (withStyles(styles)(UserEditForm))
