import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ViewLog from '../components/ViewLog'

import { withStyles, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

const styles = theme => createStyles({
    card: {
        margin: '0 20px 80px',
        width: '35%',
        justifyContent: 'center'

    },
    cardDetails: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 40,
    },
    media: {
        borderRadius: '100%',
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
        const { user, classes } = this.props
        return (
            <Fragment>
                <div className='profile-container'>
                    <Card className={classes.card} style={{ backgroundImage: "url('https://ih1.redbubble.net/image.121705826.6787/pp,550x550.jpg')" }}>
                        <Fragment>
                            <div className={classes.cardDetails}>
                                <div className={classes.media} style={{backgroundImage: `url("${user.avatar}")`}}></div>
                            </div>
                            <div className={classes.highlight}>Total number of logs: {user.logs.length}</div>
                        </Fragment>
                    </Card>

                    <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            LOG STATS (OR TIMER INFO) GO HERE
                        </div>
                    </Card>
                </div>

                <div className='logs-container'>
                    {user.logs.slice().reverse().map(log=> {
                        return (
                            <div key={log.id} className={classes.log}>
                                <ViewLog log={log} />
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
