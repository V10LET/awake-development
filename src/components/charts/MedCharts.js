import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Moment from 'moment'
import MedBar from './MedBar'
import MedDoughnut from './MedDoughnut'
import Switch from '@material-ui/core/Switch'

const styles = theme => createStyles({
    chartsContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineChart: {
        margin: 20,
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
    },
    switchRow: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center'
    }
})

class MedChart extends React.Component {

    state = {
        bar: false
    }

    day = (logs) => logs.map(l=> Moment(l.created_at).format('MMM Do YY'))

    time = (logs) => logs.map(l=> {
        let hr = Moment.duration(Number(l.time)).hours() * 60
        let min = Moment.duration(Number(l.time)).minutes()
        let sec = Moment.duration(Number(l.time)).seconds() / 60
        if (sec > 0) {
            min += sec
        }
        return hr + min
    })

    handleChange = () => this.setState({ bar: !this.state.bar })

    render () {
        const { timedLogs, classes } = this.props
        const { bar } = this.state
        return (
            <div className={classes.chartsContainer}>
                <Fragment>
                    <div className={classes.switchRow}>
                        <div style={bar ? {color: 'rgba(0,0,0,.3)'} : null}>Bar</div>
                            <Switch checked={bar} onChange={this.handleChange}/>
                        <div style={bar ? null : {color: 'rgba(0,0,0,.3)'}}>Doughnut</div>
                    </div>
                    <div className={classes.lineChart}>
                        {!bar ?
                            <MedBar time={this.time(timedLogs)} day={this.day(timedLogs)}/>
                        :
                            <MedDoughnut time={this.time(timedLogs)} day={this.day(timedLogs)}/>
                        }
                    </div>
                </Fragment>
            </div>
        )
    }
}

const mapStateToProps = state => ({ timedLogs: state.user.user.timed_logs })

export default connect(mapStateToProps)(withStyles(styles)(MedChart))
