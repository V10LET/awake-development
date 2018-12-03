import React, { Fragment } from 'react'
import { Line } from 'react-chartjs-2'

const mental = {1: 'Busy', 2: 'Foggy', 3: 'Distracted', 4: 'Neutral', 5: 'Focused', 6: 'Calm'}
const emotional = {1: 'Anger', 2: 'Shame', 3: 'Stress', 4: 'Excitement', 5: 'Content', 6: 'Gratitude'}
const physical = {1: 'Painful', 2: 'Tired', 3: 'Disconnected', 4: 'Grounded', 5: 'Energetic', 6: 'Relaxed'}
const spiritual = {1: 'Hopeless', 2: 'Uncertain', 3: 'Apathetic', 4: 'Intrigued', 5: 'Hopeful', 6: 'Inspired'}

class LineChart extends React.Component {
    render () {
        const { day, rating, title, color } = this.props

        const data = {
            labels: day,
            datasets: [{
                lineTension: .5,
                label: title,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                backgroundColor: color,
                borderColor: 'rgba(0,0,0,0)',
                scaleOverride: true,
                scaleStartValue: 0,
                scaleStepWidth: 1,
                scaleSteps: 1,
                data: rating
            }]
        }

        const options = {
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: { max: 6, min: 0, stepSize: 1},
                    gridLines: { display: false }
                }],
                xAxes: [{
                    gridLines: { display: false }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        const label = () => {
                            switch (title) {
                                case 'Mental':
                                    return mental[tooltipItem.yLabel]
                                case 'Emotional':
                                    return emotional[tooltipItem.yLabel]
                                case 'Physical':
                                    return physical[tooltipItem.yLabel]
                                case 'Spiritual':
                                    return spiritual[tooltipItem.yLabel]
                                default:
                                    return null
                            }
                        }
                        return label()
                    }
                }
            }
        }

        return (
            <Fragment>
                <h1>{title}</h1>
                <Line height={400} width={800} data={data} options={options} />
            </Fragment>
        )
    }
}

export default LineChart
