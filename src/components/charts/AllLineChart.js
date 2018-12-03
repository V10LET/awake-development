import React, { Fragment } from 'react'
import { Line } from 'react-chartjs-2'

class LineChart extends React.Component {
    render () {
        const { day, rating, title } = this.props

        const data = {
            labels: day,
            datasets: [{
                lineTension: .5,
                label: 'Mental',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(0,0,0,0)',
                scaleOverride: true,
                scaleStartValue: 0,
                scaleStepWidth: 1,
                scaleSteps: 1,
                data: rating.mentalRating
            }, {
                label: 'Emotional',
                backgroundColor: 'rgba(175,192,220,0.4)',
                borderColor: 'rgba(0,0,0,0)',
                data: rating.emotionalRating
            }, {
                label: 'Physical',
                backgroundColor: 'rgba(75,192,12,0.4)',
                borderColor: 'rgba(0,0,0,0)',
                data: rating.physicalRating
            }, {
                label: 'Spiritual',
                backgroundColor: 'rgba(75,192,102,0.4)',
                borderColor: 'rgba(0,0,0,0)',
                data: rating.spiritualRating
            }]
        }

        const options = {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{

                    ticks: {
                        max: 6,
                        min: 0,
                        stepSize: 1
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{

                    gridLines: {
                        display: false
                    }
                }]
             }
        }

        return (
            <Fragment>
                <h1>{title}</h1>
                <Line
                    height={400}
                    width={800}
                    data={data}
                    options={options}
                />
            </Fragment>
        )
    }
}

export default LineChart
