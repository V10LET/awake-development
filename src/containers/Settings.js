import React, { Component, Fragement } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => createStyles({
    settingsContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
    },
    editBtn: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
    },
    // userInfo: {
    //     display: 'flex',
    //     flexFlow: 'column wrap',
    //     alignItems: 'flex-start',
    //     margin: 40
    // },
    avatar: {
        height: 250,
        width: 250,
        backgroundSize: 'cover',
        borderRadius: '10%'
    },
    editForm: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'flex-start',
        margin: 40,
    }
})

class Settings extends Component {

    state = {
        editForm: false,
        name: this.props.user.name,
        birthday: this.props.user.birthday,
        email: this.props.user.email,
        avatar: this.props.user.avatar,
    }

    handleClick = () => this.setState({ editForm: !this.state.editForm })

    handleChange = (name) => (event) => {
        const value = event.target.value
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('submittteddd!')
        this.setState({ editForm: !this.state.editForm })
    }

    render () {
        const { user, classes } = this.props
        const { name, birthday, email, avatar, editForm } = this.state
        return (
            <div className={classes.settingsContainer}>
                <Card>

                    {!editForm ?
                        <div className={classes.editForm}>
                            <div className={classes.editBtn}>
                                <IconButton onClick={this.handleClick}><EditIcon/></IconButton>
                            </div>
                            <div style={{ backgroundImage: `url('${user.avatar}')` }} className={classes.avatar}></div>
                            <h1>{user.name}</h1>
                            <div>{user.birthday}</div>
                            <div>{user.email}</div>
                        </div>
                    :
                        <form onSubmit={this.handleSubmit} className={classes.editForm}>
                            <TextField label='' placeholder={name} onChange={this.handleChange('name')} margin='normal'/><br/>
                            <TextField label='' placeholder={birthday} onChange={this.handleChange('birthday')} margin='normal'/><br/>
                            <TextField label='' placeholder={email} onChange={this.handleChange('email')} margin='normal'/><br/>
                            <TextField label='' placeholder={avatar} onChange={this.handleChange('avatar')} margin='normal'/><br/>
                            <button type='submit'>Save Changes</button>
                        </form>
                    }


                </Card>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { user: state.user.user }
}

export default connect(mapStateToProps)(withStyles(styles)(Settings))
