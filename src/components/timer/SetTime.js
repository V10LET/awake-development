import React, { Component, Fragment } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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
    }
})

class SetTime extends Component {

    state = {
        error: false
    }

    renderTextField = () => {
        const { classes, handleChange, min, hr } = this.props
        if (min > 59) {
            if (!this.state.error) {
                this.setState({error: true})
            }
            return (
                <div>
                    <TextField label="Hours" value={hr} onChange={handleChange('hr')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                    <TextField label="Minutes" value={min} onChange={handleChange('min')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                    <div className={classes.inputError}>Please enter 0-59 minutes.</div>
                </div>
            )
        } else if (min.includes('-') || hr.includes('-')) {
            if (!this.state.error) {
                this.setState({error: true})
            }
            return (
                <div>
                    <TextField label="Hours" value={hr} onChange={handleChange('hr')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                    <TextField label="Minutes" value={min} onChange={handleChange('min')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                    <div className={classes.inputError}>Please enter a positive number.</div>
                </div>
            )
        } else {
            if (this.state.error) {
                this.setState({error: false})
            }
            return (
                <Fragment>
                    <TextField label="Hours" value={hr} onChange={handleChange('hr')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                    <TextField label="Minutes" value={min} onChange={handleChange('min')}
                        type="number" className={classes.textField} InputLabelProps={{ shrink: true }} margin="normal" />
                </Fragment>
            )

        }
    }

    render () {
        const { classes, open, handleClick } = this.props
        return (
            <div>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClick} classes={{ paper: classes.container}}>
                    <DialogTitle style={{padding: '40px 20px 10px'}}><Timelapse className={classes.timerIcon}/></DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                              {this.renderTextField()}
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions className={classes.actionBtns}>
                        <Button onClick={handleClick}>Cancel</Button>
                        <Button disabled={this.state.error ? true : false} onClick={handleClick}>Set</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default (withStyles(styles)(SetTime))
