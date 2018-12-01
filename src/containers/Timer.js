import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import { withStyles, createStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Timelapse from '@material-ui/icons/Timelapse'

const styles = theme => createStyles({
    container: {
       display: 'flex',
       flexWrap: 'wrap',
       justifyContent: 'center',
       alignItems: 'center'
    },
    formControl: {
      display: 'flex',
      flexFlow: 'row nowrap',
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 80,
    },
    inputError: {
        color: 'red',
        fontSize: '0.8em',
        fontStyle: 'oblique'
    },
    timerIcon: {
        width: '3em !important',
        height: '3em !important',
        textAlign: 'center'
    },
    actionBtns: {
    }
})

class Timer extends Component {

    state = {
        open: false,
        min: '00',
        hr: '00',
        sec: '00',
        setTime: false,
        deadline: 0,
      }

    handleChange = name => event => this.setState({ [name]: event.target.value })

    handleClick = () => this.setState({ open: !this.state.open })
    setTick = () => this.setState(this.state)

    startTimer = () => {
        let deadline = new Date().getTime() + (Number(this.state.min) * 60 * 1000) + (Number(this.state.hr) * 3600 * 1000)
        this.setState({ deadline, setTime: true }, () => {
            setInterval(this.setTick, 1000)
        })


    }

    renderTextField = () => {
        const {classes} = this.props
        console.log()
        if (this.state.min > 59) {
            return (
                <div>
                    <TextField label="Hours" value={this.state.hr} onChange={this.handleChange('hr')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                    <TextField label="Minutes" value={this.state.min} onChange={this.handleChange('min')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                    <div className={classes.inputError}>Please enter 0-59 minutes.</div>
                </div>
            )
        } else {
            return (
                <Fragment>
                    <TextField label="Hours" value={this.state.hr} onChange={this.handleChange('hr')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                    <TextField label="Minutes" value={this.state.min} onChange={this.handleChange('min')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                </Fragment>
            )

        }
    }

    renderTime = () => {
        let {hr, min} = this.state
        let currentTime = new Date().getTime()
        let duration = Moment.duration(this.state.deadline - currentTime)

        let hour = duration.hours()
        let minute = duration.minutes()
        let second = duration.seconds()

        if (hr === '00' && min === '00') {
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
        return (
            <Fragment>
                <h1>IMMA TIMER :)</h1>
                    <div>
                        <Dialog disableEscapeKeyDown open={this.state.open} onClose={this.handleClick} classes={{ paper: classes.container}}>
                            <DialogTitle style={{padding: '40px 20px 10px'}}><Timelapse className={classes.timerIcon}/></DialogTitle>
                            <DialogContent>
                                <form className={classes.container}>
                                    <FormControl className={classes.formControl}>
                                      {this.renderTextField()}
                                    </FormControl>
                                </form>
                            </DialogContent>
                            <DialogActions className={classes.actionBtns}>
                                <Button onClick={this.handleClick}>Cancel</Button>
                                <Button onClick={this.handleClick}>Set Time</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div>{this.renderTime()}</div>
                    {!this.state.setTime ?
                        <Button onClick={this.handleClick}>Set Timer</Button> :
                        <Button onClick={this.handleClick}>Pause</Button>
                    }
                    {!this.state.setTime ?
                        <Button onClick={this.startTimer}>Start Timer</Button> :
                        <Button onClick={this.handleClick}>End</Button>
                    }

            </Fragment>

        )
    }
}

const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Timer))
