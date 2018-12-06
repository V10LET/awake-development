import React, { Component, Fragment } from 'react'
import LogDetails from './LogDetails'
import LogEditForm from './LogEditForm'
import DeleteLog from './DeleteLog'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Moment from 'moment'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Tooltip from '@material-ui/core/Tooltip'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AssignmentIcon from '@material-ui/icons/Assignment'

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
        edit: false,
        deleteDialog: false
    }

    getDate = (time) => {
        let oldT = Date.parse(time)
        let newT = new Date(oldT)
        return Moment(newT).format('ddd, MMM Do')
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

    handleClick = () => {
        this.setState({ edit: !this.state.edit })
    }

    handleDialog = () => this.setState({deleteDialog: !this.state.deleteDialog})



    render () {
        const { log, classes } = this.props
        return (
            <ExpansionPanel style={{ width: 350, alignItems: 'center' }}>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AssignmentIcon style={{ marginRight: 10 }}/>
                            <div>{this.getDate(log.created_at)}</div>
                        </div>
                 </ExpansionPanelSummary>
                 <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column'}}>
                        {!this.state.edit
                          ? <Fragment>
                                <div className={classes.cardHeader}>
                                    <h3>{this.getTime(log.created_at)}</h3>
                                    <div>
                                        <Tooltip title='Edit Card' placement="top-end"><EditIcon onClick={this.handleClick}/></Tooltip>
                                        <Tooltip title='Delete Card' placement="top-end"><DeleteForeverIcon onClick={this.handleDialog}/></Tooltip>
                                        {this.state.deleteDialog ? <DeleteLog deleteDialog={this.handleDialog} logId={log.id} /> : null}
                                    </div>
                                </div>
                                <LogDetails log={log} />
                            </Fragment>
                          : <Fragment>
                                <div style={{textAlign: 'right'}}>
                                    <Tooltip title='Delete Card' placement="top-end"><DeleteForeverIcon onClick={this.handleDialog}/></Tooltip>
                                    {this.state.deleteDialog ? <DeleteLog deleteDialog={this.handleDialog} logId={log.id} /> : null}
                                </div>
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
