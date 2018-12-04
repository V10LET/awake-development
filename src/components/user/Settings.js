import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import UserEditForm from './UserEditForm'

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
        padding: '10px 10px 0'
    },
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
        margin: '0 40px 40px',
    }
})

class Settings extends Component {

    state = {
        editForm: false,
    }

    handleClick = () => this.setState({ editForm: !this.state.editForm })
    renderAvatar = (img) => img === '' ? 'https://source.unsplash.com/300x300/?nature,tree' : img

    render () {
        const { user, classes } = this.props
        return (
            <div className={classes.settingsContainer}>
                <Card>
                    {!this.state.editForm ?
                        <div className={classes.editBtn}>
                            <IconButton>
                            <Tooltip title='Edit My Info' placement="right"><EditIcon onClick={this.handleClick}/></Tooltip>
                            </IconButton>
                        </div>
                        : null
                    }
                    <div className={classes.editForm}>
                        {!this.state.editForm
                            ? <Fragment>
                                 <div style={{ backgroundImage: `url('${this.renderAvatar(user.avatar)}')` }} className={classes.avatar}></div>
                                 <h1>{user.name}</h1>
                                 <div>{user.birthday}</div>
                                 <div>{user.email}</div>
                              </Fragment>
                            : <UserEditForm handleClick={this.handleClick} />
                        }
                    </div>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { user: state.user.user }
}

export default connect(mapStateToProps)(withStyles(styles)(Settings))
