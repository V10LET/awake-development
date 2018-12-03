import React, { Component } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Moment from 'moment'
import SetTime from '../components/SetTime'
import SaveTime from '../components/SaveTime'
import singingBowl from '../style/media/singingBowl.m4a'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import Card from '@material-ui/core/Card'

const styles = theme => createStyles({
    timerContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
    },
    audioPrompt: {
        margin: '0 20px 0 0',
    },
    inputError: {
        color: 'red',
        fontSize: '0.8em',
        fontStyle: 'oblique'
    },
    switchRow: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center'
    },
    timerCard: {
        width: '40%',
        marginTop: 40
    },
    time: {
        margin: 40,
        fontSize: '3em',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    timerBtns: {
        marginTop: 40
    }
})

class Timer extends Component {

    state = {
        audio: true, renderError: false, open: false, setTime: false,
        pause: false, earlyEndOpen: false, end: false,
        timer: '', min: '', hr: '', sec: '',
        deadline: 0, remaining: 0
      }

    //----> EVENT METHODS

    handleClick = (event) => {
        let input = event.target.innerText.toLowerCase()
        if (input.includes('cancel')) {
            this.setState({ min: '', hr: '', open: !this.state.open, renderError: false })
        } else {
            this.setState({ open: !this.state.open, renderError: false })
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    setTick = () => {
        if (this.state.deadline <= new Date().getTime()) {
            clearInterval(this.state.timer)
            this.setState({ end: true })
            return this.state.audio ? new Audio(singingBowl).play() : null

        } else {
            return this.setState(this.state)
        }
    }

    startTimer = () => {
        if (this.state.min === '' &&  this.state.min === '') {
            this.setState({ renderError: true })
        } else {
            let deadline = new Date().getTime() + (3*1000)
            // (Number(this.state.min) * 60 * 1000) + (Number(this.state.hr) * 3600 * 1000)
            this.setState({ deadline, setTime: true }, () => {
                this.setState({ timer: setInterval(this.setTick, 1000) })
                return this.state.audio ? new Audio(singingBowl).play() : null
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

    handleEndEarly = () => {
        const remaining = this.state.deadline - new Date().getTime()
        clearInterval(this.state.timer)
        this.setState({ earlyEndOpen: true, remaining })
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
            <Button onClick={this.handleEndEarly}>End</Button>
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
                if (hr === '') {
                    hr = '00'
                } else {
                    hr = `0${hr}`
                }
            }
            if (min < 10) {
                if (min === '') {
                    min = '00'
                } else {
                    min = `0${min}`
                }
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

    handleNo = () => {
        this.setState(this.state)
        this.setState({ earlyEndOpen: false })
    }

    handleYes = () => {
        console.log(remaining)
        this.setState(this.state)
        this.setState({ earlyEndOpen: false })
    }

    renderEndDialog = () => {
        return (
            <Dialog disableBackdropClick disableEscapeKeyDown open={true}>
                <DialogTitle>Do you want to save this session?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleYes}>Yes</Button>
                        <Button onClick={this.handleNo}>No</Button>
                    </DialogActions>
            </Dialog>
        )
    }

    handleAudio = () => this.setState({ audio: !this.state.audio })

    render () {
        const { classes } = this.props
        const { min, hr, open, earlyEndOpen, renderError, audio, end } = this.state
        return (
            <div className={classes.timerContainer}>

                <div className={classes.switchRow}>
                    <div className={classes.audioPrompt}>Start and end with a singing bowl?</div>
                    <div style={audio ? {color: 'rgba(0,0,0,.3)'} : null}>No</div>
                        <Switch checked={audio} onChange={this.handleAudio}/>
                    <div style={audio ? null : {color: 'rgba(0,0,0,.3)'}}>Yes</div>
                </div>

                <Card className={classes.timerCard}>
                    <div className={classes.time}>{this.renderTime()}</div>
                </Card>

                {!end ?
                    <div className={classes.timerBtns}>
                        <SetTime handleChange={this.handleChange} min={min} hr={hr} open={open} handleClick={this.handleClick}/>
                        <div>{this.renderSetPause()} {this.renderStartEnd()}</div>
                        {earlyEndOpen ? this.renderEndDialog() : null}
                        {renderError ? <div className={classes.inputError}>Please set a time.</div> : null}
                    </div>
                :
                    <SaveTime min={this.state.min} hr={this.state.hr} />
                }
            </div>

        )
    }
}

const mapDispatchToProps = {}

export default (withStyles(styles)(Timer))
