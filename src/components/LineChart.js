import React, { Fragment } from 'react'
import { Line } from 'react-chartjs-2'

class LineChart extends React.Component {
    render () {
        const { day, rating, title } = this.props

        const data = {
            labels: day,
            datasets: [{
                lineTension: .5,
                label: title,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                scaleOverride: true,
                scaleStartValue: 0,
                scaleStepWidth: 1,
                scaleSteps: 1,
                data: rating
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
                    height={200}
                    width={500}
                    data={data}
                    options={options}
                />
            </Fragment>
        )
    }
}

export default LineChart
