import React, { Component, Fragment } from 'react'
import LogDetails from './LogDetails'
import LogEditForm from './LogEditForm'
import { withStyles, createStyles } from '@material-ui/core/styles'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => createStyles({
    cardHeader: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

class ViewLog extends Component {

    state = {
        edit: false
    }

    getDate = (time) => {
        let oldT = Date.parse(time)
        let newT = new Date(oldT)
        return newT.toDateString()
    }

    getTime = (time) => {
        let oldT = Date.parse(time)
        let newT = new Date(oldT)

        let hour = newT.getHours()
        let minute = newT.getMinutes()

        let ampm = hour >= 12 ? 'pm' : 'am'
        hour = hour % 12
        hour = hour ? hour : 12 //
        minute = minute < 10 ? '0' + minute : minute
        let strTime = hour + ':' + minute + ' ' + ampm

        return strTime
    }

    handleClick = (event) => {
        this.setState({ edit: !this.state.edit })
    }

    render () {
        const { log, classes } = this.props
        return (
            <ExpansionPanel style={{ width: 275 }}>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div>{this.getDate(log.created_at)}</div>
                 </ExpansionPanelSummary>
                 <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column'}}>
                        {!this.state.edit
                          ? <Fragment>
                                <div className={classes.cardHeader}>
                                    <h3>{this.getTime(log.created_at)}</h3>
                                    <Tooltip title='Edit Card' placement="top-end"><EditIcon onClick={this.handleClick}/></Tooltip>
                                </div>
                                <LogDetails log={log} />
                            </Fragment>
                          : <Fragment>
                                <div>
                                    <LogEditForm onEdit={this.handleClick} log={log} />
                                </div>
                            </Fragment>
                        }

                 </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default (withStyles(styles)(ViewLog))
