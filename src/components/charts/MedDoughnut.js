import React, { Fragment } from 'react'
import { Doughnut } from 'react-chartjs-2'

export default class MedDoughnut extends React.Component {

    state = {
        data: {}
    }

    componentDidMount() {
        this.occurance(this.props.time)
    }

    occurance = (time) => {
        const counts = {'> 1min': undefined, '1-10min': undefined, '11-20min': undefined , '21-40min': undefined, '41-59min': undefined, '1hr +': undefined}
        for (let i = 0; i < time.length; i++) {
          if (time[i] < 1) {
              counts['> 1min'] = counts['> 1min'] ? counts['> 1min'] + 1 : 1
          }
          if (time[i] >= 1 && time[i] <= 10) {
              counts['1-10min'] = counts['1-10min'] ? counts['1-10min'] + 1 : 1
          }
          if (time[i] > 10 && time[i] <= 20) {
              counts['11-20min'] = counts['11-20min'] ? counts['11-20min'] + 1 : 1
          }
          if (time[i] > 20 && time[i] <= 40) {
              counts['21-40min'] = counts['21-40min'] ? counts['21-40min'] + 1 : 1
          }
          if (time[i] > 40 && time[i] < 60) {
              counts['41-59min'] = counts['41-59min'] ? counts['41-59min'] + 1 : 1
          }
          if (time[i] >= 60) {
              counts['1hr +'] = counts['1hr +'] ? counts['1hr +'] + 1 : 1
          }
        }
        this.setState({ data: counts })
    }

    labels = () => Object.keys(this.state.data).map(d=> d)
    data = () => Object.keys(this.state.data).map(d=> this.state.data[d])

    render () {
        const data = {
            labels: this.labels(),
            datasets: [{
                label: 'time',
                backgroundColor: ['#B05813', 'rgba(0,0,0,.9)', '#138FB0', '#5E5F01', 'rgba(0,0,0,.4)', 'rgba(94,95,1,0.4)'],
                data: this.data()
            }]
        }


        return (
            <Fragment>
                <h1>Meditations</h1>
                <Doughnut height={400} width={400} data={data} />
            </Fragment>
        )
    }
}
