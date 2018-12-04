import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { Bar } from 'react-chartjs-2'
import Moment from 'moment'
import MedBarChart from './MedBarChart'

const styles = theme => createStyles({
    chartsContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

class MedChart extends React.Component {

    day = (logs) => logs.map(l=> Moment(l.created_at).format('MMM Do YY'))
    time = (logs) => logs.map(l=> l.time)

    render () {
        const { timedLogs, classes } = this.props

        return (
            <div className={classes.chartsContainer}>
                <div>
                    <MedBarChart log={this.time(timedLogs)} day={this.day(timedLogs)}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ timedLogs: state.user.user.timed_logs })

export default connect(mapStateToProps)(withStyles(styles)(MedChart))
