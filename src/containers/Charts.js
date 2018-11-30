import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import LineChart from '../components/LineChart'
import AllLineChart from '../components/AllLineChart'
import DoughnutChart from '../components/Doughnut'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const styles = theme => createStyles({
    chartsContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineChart: {
        margin: 20
    },
    switchRow: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center'
    }
})

class Charts extends React.Component {

    state = {
        doughnut: false,
        chartView: 'Mental'
    }

    componentDidMount() {
        return this.props.chartData
    }

    renderLineChart = () => {
        const { chartData } = this.props
        switch (this.state.chartView) {
            case 'Mental':
                return <LineChart day={chartData.day} rating={chartData.mentalRating} title='Mental'/>
            case 'Emotional':
                return <LineChart day={chartData.day} rating={chartData.emotionalRating} title='Emotional'/>
            case 'Physical':
                return <LineChart day={chartData.day} rating={chartData.physicalRating} title='Physical'/>
            case 'Spiritual':
                return <LineChart day={chartData.day} rating={chartData.spiritualRating} title='Spiritual'/>
            case 'All':
                return <AllLineChart day={chartData.day} rating={chartData} title='All'/>
        }
    }

    renderDoughnutChart = () => {
        const { chartData } = this.props
        switch (this.state.chartView) {
            case 'Mental':
                return <DoughnutChart day={chartData.day} rating={chartData.mentalRating} title='Mental'/>
            case 'Emotional':
                return <DoughnutChart day={chartData.day} rating={chartData.emotionalRating} title='Emotional'/>
            case 'Physical':
                return <DoughnutChart day={chartData.day} rating={chartData.physicalRating} title='Physical'/>
            case 'Spiritual':
                return <DoughnutChart day={chartData.day} rating={chartData.spiritualRating} title='Spiritual'/>
            case 'All':
                return <AllLineChart day={chartData.day} rating={chartData} title='All'/>

        }
    }

    handleRadioChange = (event) => {
        this.setState({ chartView: event.target.value })
    }

    handleChartChange = () => {
        this.setState({ doughnut: !this.state.doughnut })
    }

    render () {
        const { classes, chartData } = this.props
        const { chartView, doughnut } = this.state
        return (
            <div className={classes.chartsContainer}>
                <Fragment>
                    <div className={classes.switchRow}>
                        <div style={doughnut ? {color: 'rgba(0,0,0,.3)'} : null}>Line</div>
                            <Switch color="black" checked={doughnut} onChange={this.handleChartChange}/>
                        <div style={doughnut ? null : {color: 'rgba(0,0,0,.3)'}}>Doughnut</div>
                    </div>

                    <RadioGroup row value={chartView} onChange={this.handleRadioChange}>
                        <FormControlLabel value="Mental" control={<Radio />} label="Mental" />
                        <FormControlLabel value="Emotional" control={<Radio />} label="Emotional" />
                        <FormControlLabel value="Physical" control={<Radio />} label="Physical" />
                        <FormControlLabel value="Spiritual" control={<Radio />} label="Spiritual" />
                        {chartView === 'All' && doughnut ? this.setState({ chartView: 'Spiritual'})
                            : <FormControlLabel value="All" disabled={doughnut ? true : false} control={<Radio />} label="All" />}
                    </RadioGroup>

                    <div className={classes.lineChart}>
                        {!this.state.doughnut ? this.renderLineChart() : this.renderDoughnutChart()}
                    </div>

                </Fragment>
            </div>
        )
    }
}

const mapStateToProps = state => ({ chartData: state.user.chartData })

export default connect(mapStateToProps)(withStyles(styles)(Charts))
