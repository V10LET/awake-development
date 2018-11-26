import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ViewLog from '../components/ViewLog'

import { withStyles, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
                    {/*<ExpansionPanel style={{width: '80%'}}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            {console.log(user.name)}
                            <h3>Logs</h3>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails  style={{ display: 'flex', flexFlow: 'row wrap' }}>*/}
                            {user.logs.reverse().map(log=> {
                                return (
                                    <div className={classes.log}>
                                        <ViewLog key={log.id} log={log} />
                                    </div>
                                )
                            })}
                        {/*</ExpansionPanelDetails>
                    </ExpansionPanel>*/}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}
export default connect(mapStateToProps)(withStyles(styles)(Profile))
