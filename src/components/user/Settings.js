import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Moment from 'moment'
import UserEditForm from './UserEditForm'

import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import CakeIcon from '@material-ui/icons/Cake'
import MailIcon from '@material-ui/icons/Mail'

const styles = theme => createStyles({
    settingsContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
    },
    editBtn: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 10px 0',
    },
    avatar: {
        height: 300,
        width: '100%',
        backgroundSize: 'cover',
    },
    editForm: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'flex-start',
        margin: '1em 3em 3em',
    },
    personInfo: {
        display: 'flex',
        alignItems:'center',
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
                <Card style={{width: 400}}>
                    <Fragment>
                    {!this.state.editForm ?
                        <div style={{ backgroundImage: `url('${this.renderAvatar(user.avatar)}')` }} className={classes.avatar}>
                            <div className={classes.editBtn}>
                                <IconButton>
                                <Tooltip title='Edit My Info' placement="right"><EditIcon style={{fill: 'rgba(0,0,0,.9)'}} onClick={this.handleClick}/></Tooltip>
                                </IconButton>
                            </div>
                        </div>
                        : null
                    }
                    </Fragment>
                    <div>
                    {!this.state.editForm ?
                        <Fragment>
                        <div className={classes.editForm}>
                            <Fragment>
                                 <h1 style={{ textTransform: 'capitalize', marginBottom: '.5em'}}>{user.name}</h1>
                                 <div className={classes.personInfo}>
                                     <CakeIcon style={{marginRight: 10, height: 20, fill: 'rgba(0,0,0,.9)'}}/>
                                     {user.birthday ? Moment(user.birthday).format('MMMM Do YYYY') : user.birthday}
                                 </div>
                                 <br/>
                                 <div className={classes.personInfo}>
                                     <MailIcon style={{marginRight: 10, height: 20, fill: 'rgba(0,0,0,.9)'}}/>
                                     {user.email}
                                 </div>
                            </Fragment>
                        </div>
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
