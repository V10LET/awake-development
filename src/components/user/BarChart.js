import React, { Fragment } from 'react'
import { Bar } from 'react-chartjs-2'

const mental = ['Busy', 'Foggy', 'Distracted', 'Neutral', 'Focused', 'Calm']
const emotional = ['Anger', 'Shame', 'Stress', 'Excitement', 'Content', 'Gratitude']
const physical = ['Painful', 'Tired', 'Disconnected', 'Grounded', 'Energetic', 'Relaxed']
const spiritual = ['Hopeless', 'Uncertain', 'Apathetic', 'Intrigued', 'Hopeful', 'Inspired']

class DoughnutChart extends React.Component {

    render () {
        const { timedLogs, logs } = this.props
        const data = {
            labels: ["Meditations", "Logs"],
            datasets: [{
                backgroundColor: ['#B05813', 'rgba(0,0,0,0.9)'],
                data: [timedLogs, logs]
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
                <h2 style={{margin: '0 0 1em 0'}}>Progress</h2>
                <Bar height={250} width={300} data={data} options={options}/>
            </Fragment>
        )
    }
}

export default DoughnutChart
