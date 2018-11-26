import React, { Component, Fragment } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'

const styles = theme => createStyles({
    noEntryText: {
        fontStyle: 'oblique',
        fontSize: 13,
        color: 'rgba(0,0,0,.3)'
    },
    divider: {
        margin: '20px 0'
    }
})

class ViewLog extends Component {

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

    render () {
        const { log, classes } = this.props
        return (
            <ExpansionPanel style={{ width: 275 }}>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div>{this.getDate(log.created_at)}</div>
                 </ExpansionPanelSummary>
                 <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column'}}>
                        <h3>{this.getTime(log.created_at)}</h3>
                        <div key={log.id}>
                            <div>Mental Rating: {log.mental_rating === null
                                    ? <span className={ classes.noEntryText }> No entry...</span>
                                    : log.mental_rating}</div>
                                <div>Mental Note: {log.mental_note === null
                                    ? <span className={ classes.noEntryText }> No entry...</span>
                                    : log.mental_note}</div>

                                <Divider className={ classes.divider }/>

                                <div>Emotional Rating: {log.emotional_rating === null
                                    ? <span className={ classes.noEntryText }> No entry...</span>
                                    : log.emotional_rating}</div>
                                <div>Emotional Note: {log.emotional_note === null
                                    ? <span className={ classes.noEntryText }> No entry...</span>
                                    : log.emotional_note}</div>

                                <Divider className={ classes.divider }/>

                                <div>Physical Rating: {log.physical_rating === null
                                    ? <span className={ classes.noEntryText }> No entry...</span>
                                    : log.physical_rating}</div>
                                <div>Physical Note: {log.physical_note === null
                                    ? <span className={ classes.noEntryText }> No entry...</span>
                                    : log.physical_note}</div>

                                <Divider className={ classes.divider }/>

                                <div>Spiritual Rating: {log.spiritual_rating === null
                                    ? <span className={ classes.noEntryText }> No entry...</span>
                                    : log.spiritual_rating}</div>
                                <div>Spiritual Note: {log.spiritual_note === null
                                    ? <span className={ classes.noEntryText }> No entry...</span>
                                    : log.spiritual_note}</div>
                         </div>
                 </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default (withStyles(styles)(ViewLog))
