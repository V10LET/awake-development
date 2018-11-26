import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ViewLog from '../components/ViewLog'

import { withStyles, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

const styles = theme => createStyles({
    profileCard: {
        padding: '40px 40px 0 40px'
    },
    media: {
        borderRadius: '100%',
        height: 'auto',
        width: 250,
        height: 250,
        backgroundSize: 'cover',
    },
    highlight: {
        width: '100%',
        backgroundColor: theme.palette.secondary.dark,
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
        margin: '40px 0 0',
    },
    log: {
        margin: '20px !important',
    }
})

class Profile extends Component {

    render() {
        console.log(this.props.user.logs)
        const { user, classes } = this.props
        return (
            <Fragment>
                <div className='profile-container'>
                    <Card style={{ backgroundImage: "url('https://ih1.redbubble.net/image.121705826.6787/pp,550x550.jpg')"}}>
                        <Fragment>
                            <div className={classes.profileCard}>
                                <div className={classes.media} style={{backgroundImage: `url("${user.avatar}")`}}></div>
                            </div>
                            <div className={classes.highlight}>Total number of logs: {user.logs.length}</div>
                        </Fragment>
                    </Card>

                    <Card>
                    </Card>
                </div>

                <div className='logs-container'>
                    {user.logs.map(log=> {
                        return (
                            <div className={classes.log}>
                                <ViewLog key={log.id} log={log} />
                            </div>
                        )
                    })}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}
export default connect(mapStateToProps)(withStyles(styles)(Profile))
