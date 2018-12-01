import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Moment from 'moment'
import SetTime from '../components/SetTime'

import Button from '@material-ui/core/Button'

const styles = theme => createStyles({

})

class Timer extends Component {

    state = {
        open: false,
        min: '',
        hr: '',
        sec: '',
        setTime: false,
        pause: false,
        deadline: 0,
        timer: '',
        remaining: 0
      }

    //----> EVENT METHODS

    handleChange = name => event => {
      this.setState({ [name]: event.target.value })
      console.log(name, event.target.value)
    }

    handleClick = () => this.setState({ open: !this.state.open })
    setTick = () => this.setState(this.state)

    startTimer = () => {
      let deadline = new Date().getTime() + (Number(this.state.min) * 60 * 1000) + (Number(this.state.hr) * 3600 * 1000)
      this.setState({ deadline, setTime: true, }, () => {
          this.setState({ timer: setInterval(this.setTick, 1000) })
      })
    }

    handlePause = () => {
        const remaining = this.state.deadline - new Date().getTime()
        clearInterval(this.state.timer)
        this.setState({ remaining })
    }

    handlePlay = () => {
        this.setState({ remaining: 0 })
    }

    //----> RENDER METHODS

    renderSetPause = () => {
        const {setTime, remaining} = this.state
        if (!setTime) {
            return <Button onClick={this.handleClick}>Set Timer</Button>
        } else if (remaining !== 0) {
            return <Button onClick={this.handlePlay}>Play</Button>
        } else {
            return <Button onClick={this.handlePause}>Pause</Button>
        }
    }

    renderStartEnd = () => {
        return !this.state.setTime ?
            <Button onClick={this.startTimer}>Start Timer</Button> :
            <Button onClick={this.handleClick}>End</Button>
    }

    renderTime = () => {
        let {hr, min} = this.state
        let currentTime = new Date().getTime()
        let duration = Moment.duration(this.state.deadline - currentTime)

        let hour = duration.hours()
        let minute = duration.minutes()
        let second = duration.seconds()

        if (hr === '' && min === '') {
            return `00:00:00`
        } else if (!this.state.setTime) {
            if (hr < 10) {
                hr = `0${hr}`
            }
            if (min < 10) {
                min = `0${min}`
            }
            return `${hr}:${min}:00`
        } else {
            if (duration.hours() < 10) {
                hour = `0${hour}`
            }
            if (duration.minutes() < 10) {
                minute = `0${minute}`
            }
            if (duration.seconds() < 10) {
                second = `0${second}`
            }
            return `${hour}:${minute}:${second}`
        }
    }

    render () {
        const { classes } = this.props
        const { min, hr, open } = this.state
        return (
            <Fragment>
                <h1>IMMA TIMER :)</h1>
                    <SetTime handleChange={this.handleChange} min={min} hr={hr} open={open} handleClick={this.handleClick}/>
                    <div>{this.renderTime()}</div>
                    <div>{this.renderSetPause()} {this.renderStartEnd()}</div>
            </Fragment>

        )
    }
}

const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Timer))
