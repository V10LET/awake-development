import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import { withStyles, createStyles } from '@material-ui/core/styles'

import { setTimedLog } from '../../actions/logAction'
import Button from '@material-ui/core/Button'

const styles = theme => createStyles({
    success: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        marginTop: '2em'
    },
    btn: {
        marginTop: '1em',
        backgroundImage: 'linear-gradient(to right, #A6CFD0, #ECB492, #CD7F60)',

    }
})

class SaveTime extends Component {

    handleSave = async () => {
        const { hr, min } = this.props
        let num = (Number(min) * 60 * 1000) + (Number(hr) * 3600 * 1000)
        const time = String(num)

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
        const {classes} = this.props
        return (
            <div className={classes.success}>
                <div style={{color: 'green', fontSize: '.8em'}}>You completed your meditation! Nice.</div>
                <Button onClick={this.handleSave}  className={classes.btn}>Save Meditation</Button>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token
})
const mapDispatchToProps = { setTimedLog }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SaveTime))
