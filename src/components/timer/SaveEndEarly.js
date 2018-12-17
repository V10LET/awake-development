import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import { setTimedLog } from '../../actions/logAction'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

class SaveEndEarly extends Component {

    handleYes = async () => {
        const { hr, min, remaining } = this.props
        const initialTime = (Number(min) * 60 * 1000) + (Number(hr) * 3600 * 1000)
        const total = initialTime - remaining
        const time = String(total)

        let r = await fetch('/api/v1/timed_logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            },
            body: JSON.stringify({
                timed_log: { time: time }
            })
        })

        let data = await r.json()
        this.props.setTimedLog(data.timed_log)
        history.push('/logs')
    }

    render () {
        const {handleNo} = this.props
        return (
            <Dialog disableBackdropClick disableEscapeKeyDown open={true}>
                <DialogTitle>Do you want to save this session?</DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleYes}>Yes</Button>
                    <Button onClick={handleNo}>No</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token
})
const mapDispatchToProps = { setTimedLog }

export default connect(mapStateToProps, mapDispatchToProps)(SaveEndEarly)
