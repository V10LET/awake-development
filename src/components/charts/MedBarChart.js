import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { Bar } from 'react-chartjs-2'
import Moment from 'moment'

const styles = theme => createStyles({
    chartsContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default class MedBarChart extends React.Component {

    render () {
        const { time, day } = this.props
        const data = {
            labels: [day],
            datasets: [{
                backgroundColor: ['#B05813', 'rgba(0,0,0,0.9)'],
                data: [time]
            }]
        }

        const options = {
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: { min: 0, stepSize: 1},
                    gridLines: { display: false }
                }],
                xAxes: [{
                    gridLines: { display: false }
                }]
            }
        }

        return (
            <Fragment>
                <h1>Meditations</h1>
                <Bar height={400} width={800} data={data} options={options}/>
            </Fragment>
        )
    }
}
