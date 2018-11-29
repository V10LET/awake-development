import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import LineChart from '../components/LineChart'

const styles = theme => createStyles({
    chartsContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineChart: {
        margin: 20
    }
})
const mental = []
const emotional = []
const physical = []
const spiritual = []

class Charts extends React.Component {

    componentDidMount() {
        return this.props.chartData
    }

    render () {
        const { classes, chartData } = this.props
        console.log(chartData)
        return (
            <div className={classes.chartsContainer}>
                <div className={classes.lineChart}>
                    <LineChart day={chartData.day} rating={chartData.mentalRating} title='Mental'/>
                </div>
                <div className={classes.lineChart}>
                    <LineChart day={chartData.day} rating={chartData.emotionalRating} title='Emotional'/>
                </div>
                <div className={classes.lineChart}>
                    <LineChart day={chartData.day} rating={chartData.physicalRating} title='Physical'/>
                </div>
                <div className={classes.lineChart}>
                    <LineChart day={chartData.day} rating={chartData.spiritualRating} title='Spiritual'/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ chartData: state.user.chartData })

export default connect(mapStateToProps)(withStyles(styles)(Charts))
