import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Moment from 'moment'
import SetTime from '../components/SetTime'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const styles = theme => createStyles({
    inputError: {
        color: 'red',
        fontSize: '0.8em',
        fontStyle: 'oblique'
    },
})

class Timer extends Component {

    state = {
        renderError: false,
        open: false,
        setTime: false,
        pause: false,
        endOpen: false,
        timer: '',
        min: '',
        hr: '',
        sec: '',
        deadline: 0,
        remaining: 0,
      }

    //----> EVENT METHODS

    handleClick = () => this.setState({ open: !this.state.open, renderError: false })

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
        console.log(name, event.target.value)
    }

    setTick = () => this.setState(this.state)

    startTimer = () => {
        if (this.state.min === '' &&  this.state.min === '') {
            this.setState({ renderError: true })
        } else {
            let deadline = new Date().getTime() + (Number(this.state.min) * 60 * 1000) + (Number(this.state.hr) * 3600 * 1000)
            this.setState({ deadline, setTime: true, }, () => {
                this.setState({ timer: setInterval(this.setTick, 1000) })
            })
        }
    }

    handlePause = () => {
        const remaining = this.state.deadline - new Date().getTime()
        clearInterval(this.state.timer)
        this.setState({ remaining })
    }

    handlePlay = () => {
        let deadline = new Date().getTime() + this.state.remaining
        this.setState({ remaining: 0, deadline }, ()=> {
            this.setState({ timer: setInterval(this.setTick, 1000) })
        })
    }

    handleEnd = () => {
        const time = this.state.deadline
        this.setState({ endOpen: true })
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
            <Button onClick={this.handleEnd}>End</Button>
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

    renderEndDialog = () => {
        return (
            <Dialog disableBackdropClick disableEscapeKeyDown open={true}>
                <DialogTitle>Do you want to save this session?</DialogTitle>
                    <DialogActions>
                        <Button onClick={null}>Yes</Button>
                        <Button onClick={null}>No</Button>
                    </DialogActions>
            </Dialog>
        )
    }

    render () {
        const { classes } = this.props
        const { min, hr, open, endOpen, renderError } = this.state
        return (
            <Fragment>
                <h1>IMMA TIMER :)</h1>
                    <SetTime handleChange={this.handleChange} min={min} hr={hr} open={open} handleClick={this.handleClick}/>
                    <div>{this.renderTime()}</div>
                    <div>{this.renderSetPause()} {this.renderStartEnd()}</div>
                    {endOpen ? this.renderEndDialog() : null}
                    {renderError ? <div className={classes.inputError}>Please set a time.</div> : null}
            </Fragment>

        )
    }
}

const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Timer))
