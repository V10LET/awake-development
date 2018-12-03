import React, { Component } from 'react'
import Moment from 'moment'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TimelapseIcon from '@material-ui/icons/Timelapse'

export default class ViewMed extends Component {

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

    renderTime = (time) => {
        time = Moment.duration(Number(time))
        let hour = time.hours()
        let minute = time.minutes()
        let second = time.seconds()

        if (hour > 1) {
            hour = `${hour} hours`
        } else if (hour === 1) {
            hour = `${hour} hour`
        }

        if (minute > 1) {
            minute = `${minute} minutes`
        } else if (minute === 1) {
            minute = `${minute} minute`
        }

        if (second > 1) {
            second = `${second} seconds`
        } else if (second === 1) {
            second = `${second} second`
        }

        if (hour === 0) {
            if (minute === 0) {
                return second
            } else if (second === 0) {
                return minute
            } else {
                return `${minute} and ${second}`
            }
        } else if (hour !== 0) {
            if (minute === 0 && second === 0) {
                return hour
            } else if (second === 0) {
                return `${hour} and ${minute}`
            } else {
                return `${hour}, ${minute} and ${second}`
            }
        }

    }

    render () {
        const { log } = this.props
        return (
            <ExpansionPanel style={{ width: 275 }}>
                 <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <div style={{ display: 'flex', alignItems: 'center' }}>
                         <TimelapseIcon style={{ marginRight: 10 }}/>
                         <div>{this.getDate(log.created_at)}</div>
                     </div>
                 </ExpansionPanelSummary>
                 <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column'}}>
                        <h3>{this.renderTime(log.time)}</h3>
                        <div>{this.getTime(log.created_at)}</div>
                 </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}
