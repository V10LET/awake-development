import React, { Fragment } from 'react'
import { Bar } from 'react-chartjs-2'

const backgroundColor = ['#138FB0','#B05813', 'rgba(0,0,0,0.9)', '#5E5F01']


export default class MedBar extends React.Component {

    color = (time) => time ? time.map(t=> backgroundColor[Math.floor(Math.random() * backgroundColor.length)]) : null

    render () {
        const { time, day } = this.props

        const data = {
            labels: day,
            datasets: [{
                label: 'Minutes',
                backgroundColor: this.color(time),
                data: time
            }]
        }

        const options = {
            legend: { display: false },
            scales: {
                yAxes: [{ gridLines: { display: false } }],
                xAxes: [{ gridLines: { display: false } }]
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
