import React, { Component, Fragment } from 'react'
import { Doughnut } from 'react-chartjs-2'

const mental = ['Busy', 'Foggy', 'Distracted', 'Neutral', 'Focused', 'Calm']
const emotional = ['Anger', 'Shame', 'Stress', 'Excitement', 'Content', 'Gratitude']
const physical = ['Painful', 'Tired', 'Disconnected', 'Grounded', 'Energetic', 'Relaxed']
const spiritual = ['Hopeless', 'Uncertain', 'Apathetic', 'Intrigued', 'Hopeful', 'Inspired']

export default class DoughnutChart extends Component {

    occurance = (rating) => {
        const counts = {}
        for (let i = 0; i < rating.length; i++) {
          let num = rating[i]
          counts[num] = counts[num] ? counts[num] + 1 : 1
        }
        return [counts[1], counts[2], counts[3], counts[4], counts[5], counts[6]]
    }

    labels = (title) => {
        switch (title) {
            case 'Mental':
                return mental
            case 'Emotional':
                return emotional
            case 'Physical':
                return physical
            case 'Spiritual':
                return spiritual
            default:
                return null
        }
    }

    render () {
        const { rating, title } = this.props
        const data = {
            labels: this.labels(title),
            datasets: [{
                label: title,
                backgroundColor: ['#B05813', 'rgba(0,0,0,.9)', '#138FB0', '#5E5F01', 'rgba(0,0,0,.4)', 'rgba(94,95,1,0.4)'],
                data: this.occurance(rating)
            }]
        }


        return (
            <Fragment>
                <h1>{title}</h1>
                <Doughnut height={400} width={400} data={data} />
            </Fragment>
        )
    }
}
